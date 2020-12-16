# REST JSON API
**Rest JSON API in express - using mongodb**

**Features:**

>-Create/Read/Update/Delete

>-JSON request and response (not URL parameter(s) based)

>-Authetification method (can be disabled simply by removing 'API_KEY' from .env file)

>-call logging, authetificaiton & DB call implemented via middleware

>-included Postman Collection+Environment with authetification and all calls

**Prerequisites:**

>-intalled mongodb (if you see 'Connected to Database' after starting server - you're good to go)

**Setup:**

*open git, change path to designated folder and clone this repository*

*follow next steps below*

*type **bolded** text to git*

>1) **npm init**

>>-*keep pressing enter for default values until you get file package.json*

>2) **npm i express mongoose**

>>-*dotenv dependecy allows to pull environemnt variables from a doteenv file*

>>-*nodemon dependecy allows to restart server automatically when changes are done*

>3) **npm i --save-dev dotenv nodemon**

>>-*dotenv allows to pull in environemnt variables from a doteenv file*

>>-*nodemon allows to restart server automatically when changes are done*

>4) create '.env' file in main directory and set following:

>>DATABASE_URL=mongodb://localhost/users

>>API_KEY=*insert_random_string_to_be_used_as_API_key*

>>*NOTES:*

>>*-modify URL before deploying, innitialy set to local host for testing*

>>*-if API_KEY is removed (for testing) - API will work without any authetificaiton*

>5) **npm run devStart**

>>use to run the server

**Authetification:**

>>'AUTH' header set to: CryptoJS.SHA256(API_KEY + utcTime).toString(CryptoJS.enc.Hex)

>>utcTime format is YYYYMMDDHHmmss

>>server backtracks 10 seconds to accommodate network delay

**Defining Database:**

>Setup database schema in models/user.js (just modify the schema object) or create new schema in new file.

**Supporting Postman Library files**
>REST JSON API in node.js.postman_collection.json
>REST JSON API in node.js.postman_environment.json