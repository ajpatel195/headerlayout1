# ------------------------ Build the builder image --------------------------------
# Create an alias image to build the project & executable.
# The executable built will be non cross compilable exec - requires same arch
# ----------------------------------------------------------------------------------
FROM 942314741364.dkr.ecr.us-east-1.amazonaws.com/devops/node:16.13.0-alpine AS header-builder
RUN addgroup -S appuser && adduser -S appuser -G appuser -u 1001 -h /home/appuser && \
    chown -R appuser:appuser /home/appuser 
ARG build_env=dev
RUN apk update && apk add --no-cache curl && \
    curl https://static.snyk.io/cli/latest/snyk-linux -o /usr/local/bin/snyk && \
    chmod +x /usr/local/bin/snyk

# Build header for specified environment
WORKDIR /home/appuser/header
COPY --chown=appuser:appuser ["package*.json", "./"]
RUN npm install
COPY --chown=appuser:appuser . .
# Arg to determine whether to run tests or skip unit tests
ARG RUN_UNIT_TESTS=false
# Arg to determine whether to fail build when running tests. Only when RUN_TESTS=true
ARG IGNORE_FAILURE=false
ARG RUN_SAST=false
ARG SNYK_TOKEN
ARG SAST_TYPE=iac
RUN ./build-app.sh $RUN_UNIT_TESTS $IGNORE_FAILURE $RUN_SAST $SNYK_TOKEN $SAST_TYPE
RUN npm run build:${build_env}


## ---- Base image for nginx basic files to run in distroless image -----------------
FROM 942314741364.dkr.ecr.us-east-1.amazonaws.com/devops/nginx-unprivileged:1.21-alpine as nginx-base
ENV TIME_ZONE="UTC"
USER 0
# Adding nginx libraries required in distroless image
# distroless image needs all the dependent libraries
RUN mkdir -p /opt/var/cache/nginx && \
    cp -a --parents /usr/lib/nginx /opt && \
    cp -a --parents /usr/share/nginx /opt && \
    cp -a --parents /var/log/nginx /opt && \
    cp -aL --parents /var/run /opt && \
    cp -aL --parents /var/cache/nginx/ /opt && \
    cp -a --parents /etc/nginx /opt && \
    cp -a --parents /etc/passwd /opt && \
    cp -a --parents /etc/group /opt && \
    cp -a --parents /usr/sbin/nginx /opt && \
    cp -a --parents /usr/sbin/nginx-debug /opt && \
    cp -a --parents /lib/libcrypto.so.* /opt && \
    cp -a --parents /lib/libz.* /opt && \
    cp -a --parents /lib/libc.* /opt && \
    cp -a --parents /lib/ld-musl-x86_64.so.* /opt && \
    cp -a --parents /lib/libssl.so.* /opt && \
    cp -a --parents /usr/lib/lib* /opt && \
    cp /usr/share/zoneinfo/${TIME_ZONE:-ROC} /opt/etc/localtime
USER 1000


# ------------------- Build the executable image ---------------------------------
# Create a docker image with only the executable. No access to source code.
# Use distroless img. Debug images allow login via sh into the image
# --------------------------------------------------------------------------------
FROM 942314741364.dkr.ecr.us-east-1.amazonaws.com/devops/distroless/static:debug as header
EXPOSE 8080
STOPSIGNAL SIGTERM
WORKDIR /tmp

COPY --from=header-builder /etc/passwd /etc/passwd
COPY --from=nginx-base /opt /

ARG version=dev
LABEL release=$version

COPY --from=header-builder /home/appuser/header/output/m1-header.js /usr/share/nginx/html/v3/js/m1-header/m1-header-2021042000.js
USER 1001
ENTRYPOINT ["nginx", "-g", "daemon off;"]