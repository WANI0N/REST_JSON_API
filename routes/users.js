require('dotenv').config()
const crypt = require("crypto")
const express = require('express')
const router = express.Router()
const User = require('../models/user') // created schema for mongo db in models/user.js

// GET all
router.get('/all', logQuery , checkAuthorization, async (req, res) => {
    try {
        // get all users from model
        const users = await User.find() // wait for all pull before continuing
        //res.status(200).json(users)
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})


// GET single
router.get('/', logQuery , checkAuthorization, getUser, (req, res) => { // req.params.id
    res.json(res.user)
})

// POST single
router.post('/', logQuery , checkAuthorization, async (req, res) => {

    const user = new User(
        req.body
    )
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

// PUT/patch/update single - patch only update passed on data, leave the rest as it was
router.patch('/', logQuery , checkAuthorization, getUser, async (req, res) => {
    
    //looping through schema and updating properties that are present in payload
    for (const [key, obj] of Object.entries(User.schema.obj)) {
        if (req.body[key] != null){
            res.user[key] = req.body[key]
        }
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// DELETE single
router.delete('/', logQuery ,checkAuthorization, getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User Deleted' })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})







//middleware
function logQuery(req,res,next){
    console.log(req.method + '\t' + new Date())
    next()
}

async function checkAuthorization(req, res, next){
    //if API_KEY is not set in .env authetification is skipped
    if (process.env.API_KEY == null){
        next()
        return
    }
        
    if (req.header('AUTH') == null){
        return res.status(401).json({ message: 'Unauthorized'})
    }

    try{
        i = 0
        for (i == 0; i < 10; i++){
            /*
            AUTH header value = sha256(API_KEY + timestamp)
            timestamp format (UTC) = YYYYMMDDHHMMSS
            loops 10 seconds backwards for traffic time offset
            */
            if (req.header('AUTH') == crypt.createHash('sha256').update(process.env.API_KEY + getTimeStamp(i)).digest('hex'))
                break
            if (i == 9)
                return res.status(401).json({ message: 'Unauthorized'})
        }
    } catch (err){
        return res.status(401).json({ message: err.message})
    }
    next()
}

async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.body.id)
        if (user == null){
            return res.status(404).json({message : 'Cannot find user'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }
    res.user = user
    next()
}

function getTimeStamp(offset = 0){

    /*
    returns UTC in YYYYMMDDHHMMSS format
    offset value deducts number of seconds
    */
    t = new Date()

    if (offset > 0)
        t.setSeconds(t.getSeconds()-offset,0)
    
    t = t.toISOString().replace(/T/, ' ').replace(/\..+/, '')
    
    return t.match( /\d+/g ).join('')

}

module.exports = router