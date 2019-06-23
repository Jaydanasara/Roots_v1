const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    
    friendName: { type: String, required: true },
    Friend_id:{ type: String, required: true },
    addFriend:Boolean,
    friendPic:{ type: String, required: false },
    dateFriended:{ type: Date,default: Date.now }
});

const friendsData = mongoose.model("friendsData", friendsSchema);

module.exports = friendsData;