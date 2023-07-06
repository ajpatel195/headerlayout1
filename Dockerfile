# ------------------------ Build the builder image --------------------------------
# Create an alias image to build the project & executable.
# The executable built will be non cross compilable exec - requires same arch
# ----------------------------------------------------------------------------------
FROM 942314741364.dkr.ecr.us-east-1.amazonaws.com/devops/node:16-alpine-headless-secure AS node-builder
# RUN addgroup -S appuser && adduser -S appuser -G appuser -u 1001 -h /home/appuser && chown -R appuser:appuser /home/appuser
# RUN apk update && apk add --no-cache curl && \
#     curl https://static.snyk.io/cli/latest/snyk-linux -o /usr/local/bin/snyk && \
#     chmod +x /usr/local/bin/snyk
# USER 1001
ARG build_env=dev
WORKDIR /home/appuser
COPY --chown=nginx:nginx ["./package*.json", "./build-app.sh", "./"]
RUN npm install
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
COPY --chown=nginx:nginx . .
RUN mkdir /tmp/logs && chown -R nginx:nginx /tmp/logs
# Arg to determine whether to run tests or skip unit tests
ARG RUN_UNIT_TESTS=false
# Arg to determine whether to fail build when running tests. Only when RUN_TESTS=true
ARG IGNORE_FAILURE=false
ARG RUN_SAST=false
ARG SNYK_TOKEN
ARG SAST_TYPE=iac
RUN ./build-app.sh $RUN_UNIT_TESTS $IGNORE_FAILURE $RUN_SAST $SNYK_TOKEN $SAST_TYPE

# ------------------- Build the executable image ---------------------------------
# Create a docker image with only the executable. No access to source code.
# Use distroless img. Debug images allow login via sh into the image
# --------------------------------------------------------------------------------
FROM 942314741364.dkr.ecr.us-east-1.amazonaws.com/devops/distroless/nodejs:16-debug as headerlayout1
EXPOSE 9010
COPY --from=node-builder /etc/passwd /etc/passwd
USER 65532
WORKDIR /home/nonroot
ARG version=dev
LABEL release=$version
COPY --from=node-builder /home/appuser /home/nonroot
CMD ["bin/www"]
