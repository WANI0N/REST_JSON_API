# REST JSON API

## Tools used:

[**node.js**](https://nodejs.org/en/), [**express**](https://expressjs.com/), [**mongodb**](https://www.mongodb.com/), [**mongoose**](https://mongoosejs.com/) and [**postman**](https://www.postman.com/)

**Features:**

- Create/Read/Update/Delete

- JSON request and response (not URL parameter(s) based)

- authentication method (can be disabled simply by removing 'API_KEY' from .env file)

- call logging, authentication & DB call implemented via middleware

- included Postman Collection+Environment with authetification and all calls

**Prerequisites:**

- intalled mongodb (if you see 'Connected to Database' in console after starting server - you're good to go)

## Setup:

### 1) clone the repository

 - open git and change path to designated folder

```
$ git clone https://github.com/WANI0N/REST_JSON_API
```
 - [how to clone repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

### 2) install dependencies

```
$ npm i express mongoose

$ npm i --save-dev dotenv nodemon
```
### 3) create '.env' file in main cloned directory and set following:
```
DATABASE_URL=mongodb://localhost/users
API_KEY=*insert_random_string_to_be_used_as_API_key*
```
 - modify URL before deploying, innitialy set to local host for testing
 - if API_KEY is removed (for testing) - API will work without any authentication

### 4) start server
```
$ npm run devStart
```

**Authentication:**

 - 'AUTH' header set to: CryptoJS.SHA256(API_KEY + utcTime).toString(CryptoJS.enc.Hex)

 - utcTime format is YYYYMMDDHHmmss

 - server backtracks 10 seconds to accommodate network delay

**Defining Database:**

 - Setup database schema in models/user.js (just modify the schema object) or create new schema in new file.

**Supporting Postman Library files**
 - REST JSON API in node.js.postman_collection.json

 - REST JSON API in node.js.postman_environment.json
