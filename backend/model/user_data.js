const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'user_data'})

const model = mongoose.model('user_data',User)

module.exports = model;