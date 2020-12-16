require('dotenv').config() // load all environment variables from .env file

const express = require('express') // pull in express library
const app = express() // app variable to be used to configure server
const mongoose = require('mongoose') // require the library for setup

// connecting to database [Database name = 'users']
// both useNewUrlParser and useUnifiedTopology are prompted recommendations (when 'npm run devStart') to add to fix errors
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection // variable db used to reference database
db.on('error', (error) => console.error(error)) // on event error, pass log the error in console.error
db.once('open', () => console.log('Connected to Database')) // once = only run once

//setup server to accept JSON
app.use(express.json()) // accept JSON as body
//setup routes -> create folder routes and file users.js
const usersRouter = require('./routes/users')
//add route
app.use('/users', usersRouter) // url = 'localhost:3000/users'

app.listen(3000, () => console.log('Server Started')) // use 'npm run devStart' in git terminal to run server for localhost:3000