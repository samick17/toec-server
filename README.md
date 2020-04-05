## Setup

 - cd app
 - npm install

## [Run]

```bash
 chmod +x ./ci/deploy.sh
 openssl genrsa -out ./env/private.key 4096
 ``` 
 > private.key is used to hash user password to database, please keep it carefully.
 
 ```bash
 npm start
 
 ```
 >The default configuration is "./app/env/dev.env",
 >for more information, see also "./app/env/index.js"
 >server: http://127.0.0.1/53300

## [Deploy] Setup Enviroment & launch with docker

 - Copy "stage.env" to ".env" of app/env folder
 ```bash
 chmod +x ./ci/deploy.sh
 ```
 - generate private.key to app/env folder
 ```bash
 openssl genrsa -out ./env/private.key 4096
 sh ./ci/deploy.sh
 ```

## [UnitTest]

```bash
 npm run test
```
 > see also "./app/test"

## Error Handler

 - entry: "./app/priv/error-handler"
 - error codes: "./app/priv/error"

## DataBase

 - This product use ORM: sequelize
 - Database Schema: "./app/priv/dbs/dbs"
 - Database API: "./app/priv/dbs/dbs-api"

## OAuth

 - "./app/priv/oauth"

## Payment API

 - Stripe: "./app/priv/stripe"

## RESTful API

 - "./app/routes/"
 > Flow of API
 > Request from client -> Check authorized(Throw error if valid) -> Validate arguments(Throw error if invalid) ->  Do business logic(Throw error if failed) -> response
