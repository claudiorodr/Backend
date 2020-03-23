const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        max : 255,
        min : 10
        
    },
    email : {
        type : String,
        required : true,
        max : 255,
        min : 10

    },
    password : {
        type : String,
        required : true,
        max : 255,
        min : 10

    }
})

module.exports = mongoose.model('User',userSchema)
