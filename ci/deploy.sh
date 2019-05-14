#!/usr/bin/env sh

git pull
export SERVER_PORT=53300
export INTERNAL_SERVER_PORT=53300
export HOST_NAME=host.docker.internal
# export HOST_IP=10.0.2.15
export HOST_IP=192.168.1.10
export REDIS_NAME=redis
export REDIS_PORT=6379
mkdir -p ./data/redis
if [ ! -f ./app/env/private.key ]; then
	openssl genrsa -out ./app/env/private.key 4096
fi
node ./ci/deploy.js
