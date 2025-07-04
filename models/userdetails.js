const mongoose = require('mongoose');

const userDetailSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
    },
    number:Number,
    email:{
        type:String,
        unique:true,
    },
    department:{
        type:String,
        default:"Operation",
    },
    password:String,
});

module.exports = mongoose.model('UserDetails', userDetailSchema);