const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstname:{ type: String, required: true },
  lastname:{ type: String, required: true },
  age:{ type: Number, required: true },
  emailaddress:{ type: String, required: true, unique:true},
  password: { type: String,trim: true, required: true },
  screenName: { type: String, required: true },
  scrUser_id: { type: String, required: false },
  userPic:{ type: String, required: false },
  userCreated: {type: Date, default: Date.now},
  securityQuestion:{ type: String, required: false },
  securityAnswer:{ type: String, required: false },
  birthDate:{ type: String, required: false },
  gender:{ type: String, required: false },
  phoneNumber:{ type: String, required: false },
  cityState:{ type: String, required: false },
  relationship:{ type: String, required: false },
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

const usersData = mongoose.model("usersData", usersSchema);

module.exports = usersData;
