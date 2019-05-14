## Setup Enviroment & launch with docker

 - Copy "stage.env" to ".env" of app/env folder
 - chmod +x ./ci/deploy.sh
 - # generate private.key to app/env folder
 - openssl genrsa -out ./env/private.key 4096
 - sh ./ci/deploy.sh
