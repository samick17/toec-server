#!/usr/bin/env sh

git pull
export SERVER_PORT=53300
export INTERNAL_SERVER_PORT=53300
export HOST_NAME=host.docker.internal
export HOST_IP=10.0.2.15
node ./ci/deploy.js
