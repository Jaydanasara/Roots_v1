const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName:{type:String,required:true},
    groupType:{type:String,required:true},
    groupPrivacy:{type:String,required:true},
    groupDescription:{type:String,required:true},
owners: [{
    userName:{type:String,required:false},
    user_ID:{type:String,required:false},
    userPic:{type:String,required:false},
    dateJoined:{ type: Date,default: Date.now },
    
}],
admins:[{
    user_ID:{type:String,required:false},
    userName:{type:String,required:false},
    userPic:{type:String,required:false},
    dateJoined:{ type: Date,default: Date.now },
    addBy:{type:String}
}],
members:[{
    user_ID:{type:String,required:false},
    userName:{type:String,required:false},
    userPic:{type:String,required:false},
    dateJoined:{ type: Date,default: Date.now },
    addBy:{type:String}
}],
dateCreated:{ type: Date,default: Date.now },
grpLogoPic:{type:String,required:false},
groupPics:[],
post: [{
    type: Schema.Types.ObjectId,
    ref: "postData"
  }],
  events:[],

  notifications:[{
    name:{type:String, required:false},
    user_id:{type:String, required:false},
    notificationType:{type:String, required:false},
    userPic:{type:String, required:false},
    content:{type:String, required:false},
    receiver:{type:String, required:false},
    receiverName:{type:String, required:false},
    dateCreated:{type: Date, default: Date.now},
   
   
  }]



})

const groupData = mongoose.model("groupData", groupSchema);

module.exports = groupData;