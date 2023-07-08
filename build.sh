#!/bin/bash
ENVIRON=$1
VERSION=$2
IMAGE_TAG=$1

ALL_ENV='dev|beta|alpha1|qa'

if [[ -z $ENVIRON ]]; then
    echo "Please provide the environment to deploy on."
    exit 1
fi

if [[ $ENVIRON == "stg" || $ENVIRON == "prod" ]]; then
    if [[ -z $VERSION ]]; then
        echo "Please provide the release number."
        exit 1
    fi
    IMAGE_TAG="$1-$2"
elif [[ "$ENVIRON" =~ $ALL_ENV ]]; then
    IMAGE_TAG=$ENVIRON
    VERSION=$ENVIRON
    ENVIRON="dev"
fi

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 942314741364.dkr.ecr.us-east-1.amazonaws.com
echo "Building image: 942314741364.dkr.ecr.us-east-1.amazonaws.com/m1-platform/headerlayout1:$IMAGE_TAG  for env: $ENVIRON & version: $VERSION"
# Passing ng configuration as build_env for building portal & release version for label to filter
docker build --build-arg build_env=$ENVIRON --build-arg version=$VERSION -t 942314741364.dkr.ecr.us-east-1.amazonaws.com/m1-platform/headerlayout1:$IMAGE_TAG .

echo "Pushing image: 942314741364.dkr.ecr.us-east-1.amazonaws.com/m1-platform/headerlayout1:$IMAGE_TAG"
docker push 942314741364.dkr.ecr.us-east-1.amazonaws.com/m1-platform/headerlayout1:$IMAGE_TAG