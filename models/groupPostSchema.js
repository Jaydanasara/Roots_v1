const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const groupPostSchema = new Schema({
   groupId:{ type: String, required: false },
    content: { type: String, required: false },
    user_ID: { type: String, required: false },
    post_by: { type: String, required: true },
    picUrl:{ type: String, required: false },
    videoUrl:{ type: String, required: false },
    post_by_pic:{ type: String, required: false },
    tags: [],
    likes: [ {
      user:{ type: String, required: false },
      user_id: { type: String, required: false },
     }],
    dateCreated:{ type: Date,default: Date.now },
    comments: [	
       {
          user:{ type: String, required: false },
          user_id: { type: String, required: false },
          comment: { type: String, required: false },
          picUrl:{ type: String, required: false },
          dateCreated:{ type: Date, default: Date.now  },
          like: []
       }
      
    ],
 
});

const groupPostData = mongoose.model("groupPostData",groupPostSchema);

module.exports = groupPostData;