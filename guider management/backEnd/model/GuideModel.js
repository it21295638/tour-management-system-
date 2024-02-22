const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    
      guidence_id:{
      type:String,
      required:true
     },
     guidence_name:{
      type:String,
      required:false
     },
     guidence_age:{
        type:String,
        required:false
     },
     guidence_nic:{
        type:String,
        required:false
     },
     guidence_description:{
        type:String,
        required:false
     },
    });
    

module.exports = mongoose.model('guideManagemnt',guideSchema);