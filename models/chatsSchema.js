const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
  usersFirstNames:[],
  user_id:{ type: String, required: true },
 
     messages:[
       {
       content:{ type: String, required: true },
       sender:{ type: String, required: true },
       dateCreated:{ type: Date,default: Date.now },
       avatar:{type:String,required:false},
       picUrl:{ type: String, required: false },
       vidUrl:{ type: String, required: false }
      }],
     users:[],
     receiverHasRead:{type:Boolean,default:false}

 
 

});

const chatsData = mongoose.model("chatsData", chatsSchema);

module.exports = chatsData;
