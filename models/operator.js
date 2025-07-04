const mongoose = require('mongoose');

const operatorDetailSchema=new mongoose.Schema({
    operatorName:String,
    number:Number,
    email:String,
    department:String,
    tsolved:Number,
    tpending:Number,
    tprogress:Number,
});

module.exports = mongoose.model('operatorDetails', operatorDetailSchema);