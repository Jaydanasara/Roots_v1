const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenNameSchema = new Schema({
  firstname:{ type: String, required: true },
  lastname:{ type: String, required: true },
  screenName: { type: String, required: true },
  userPic:{ type: String, required: false },
  userCreated: {type: Date, default: Date.now},
  user_ID: { type: String, required: false },
  birthDate:{ type: String, required: false },

  cityState:{ type: String, required: false },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "postData"
  }],
  friends:[{
    type: Schema.Types.ObjectId,
    ref: "friendsData"
  }],

  photos:[{
    type:String, required: false 
  }],

  messages:[{
    name:{type:String, required:false},
    user_id:{type:String, required:false},
    userPic:{type:String, required:false},
    emailaddress:{type:String, requireed:false}
  }],

  notifications:[{
    name:{type:String, required:false},
    user_id:{type:String, required:false},
    notificationType:{type:String, required:false},
    userPic:{type:String, required:false},
    content:{type:String, required:false},
    post_id:{type:String, required:true}
   
  }]


});

const screenNameData = mongoose.model("screenNameData", screenNameSchema);

module.exports = screenNameData;
