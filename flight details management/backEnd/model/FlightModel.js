const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    
     flight_no:{
      type:String,
      required:true
     },
     flight_name:{
      type:String,
      required:false
     },
     flight_type:{
        type:String,
        required:false
     },
     pasengers:{
        type:String,
        required:false
     },
     departure:{
        type:String,
        required:false
     },
     arrival:{
        type:String,
        required:false
     },
    });
    

module.exports = mongoose.model('Flight',financeSchema);