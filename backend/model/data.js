const mongoose = require('mongoose')

const data = new mongoose.Schema({
    date:{
        type:String,
        require:true,
    },
    logs:{ 
        type : Array , 
        "default" : [] 
    }
})

const dataDetails = mongoose.model('data_record',data)

module.exports = dataDetails;