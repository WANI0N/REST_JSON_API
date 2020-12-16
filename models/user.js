const mongoose = require('mongoose')

// creating Schema, intake JSON
const userSchema = new mongoose.Schema({
    /*
    defining what properties will the database have
    */
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    accessLevel:{
        type: String,
        required: true,
        default: 0
    },
    timestamp:{
        type: Date,
        required: true,
        default: Date.now
    }
})


// exporting - name+Schema
// model allows interacting directly with the database using this schema
module.exports = mongoose.model('User', userSchema)