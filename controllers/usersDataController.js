const { isValidObjectId, Mongoose } = require("mongoose");
const db = require("../models");

// Defining methods for the booksController
module.exports = {

  findUserPost: function (req, res) {
    db.usersData
      .findOne({ _id: req.body._id })

      .populate("post")
      .sort({ dateCreated: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findScrUserPost: function (req, res) {

    db.screenNameData
      .findOne({ _id: req.body._id })
      .sort({ dateCreated: -1 })
      .populate("post")

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findFriendsPost: function (req, res) {

    const friendsPost = [];
    for (var i = 0, len = req.body.friends.length; i < len; i++) {
      friendsPost.push({ user_ID: req.body.friends[i] });
    }

    db.postData
      .find({ $or: friendsPost })


      .sort({ dateCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  findUserinfo: function (req, res) {

    db.usersData
      .findOne({ emailaddress: req.body.emailaddress })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getFriendsInfo: function (req, res) {

    db.usersData
      .find({ _id: req.body._id })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllUsers: function (req, res) {

    db.usersData
      .find()

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  findAllScrUsers: function (req, res) {

    db.screenNameData
      .find()

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findFriendsList: function (req, res) {

    const friendsList = [];
    for (var i = 0, len = req.body.friends.length; i < len; i++) {
      friendsList.push({ _id: req.body.friends[i] });
    }

    db.usersData
      .find({ $or: friendsList })


      .sort({ dateCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {

    db.usersData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addSrcUId: function (req, res) {

    db.usersData
      .findByIdAndUpdate({ _id: req.body.user_ID }, { scrUser_id: req.body.scrUser_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function (req, res) {

    db.usersData
      .findOneAndUpdate({ _id: req.body._id }, { $push: { post: req.body.post } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.usersData
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateByID: function (req, res) {

    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, req.body.profileEdit, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  updateScrProfile: function (req, res) {

    db.screenNameData
      .findByIdAndUpdate({ _id: req.params.id }, req.body.profileEdit, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  createPost: function (req, res) {

    db.postData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createFriend: function (req, res) {

    db.friendsData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addFriendsID: function (req, res) {

    db.usersData
      .findOneAndUpdate({ _id: req.body._id }, { $push: { friends: req.body.friends } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  saveInstMessNote: function (req, res) {
    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { messages: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  saveNotification: function (req, res) {
    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  delInstMessNote: function (req, res) {

    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, { $set: { messages: [] } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  delNotification: function (req, res) {

    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  saveSCInstMessNote: function (req, res) {
    db.screenNameData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { messages: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  saveSCNotification: function (req, res) {
    db.screenNameData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  delSCNotification: function (req, res) {
    db.screenNameData

      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  delSCInstMessNote: function (req, res) {

    db.screenNameData
      .findByIdAndUpdate({ _id: req.params.id }, { $set: { messages: [] } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  deleteFriendID: function (req, res) {

    db.usersData
      .findOneAndUpdate({ _id: req.body._id }, { $pull: { friends: req.body.friends } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateComments: function (req, res) {

    db.postData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getSinglePost: function (req, res) {

    db.postData
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removePost: function (req, res) {

    db.postData
      .findOneAndDelete({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  changePost: function (req, res) {


    db.postData
      .findByIdAndUpdate({ _id: req.params.id }, { content: req.body.content })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateLikes: function (req, res) {

    db.postData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeLikes: function (req, res) {

    db.postData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeComment: function (req, res) {

    db.postData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { comments: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  changeComment: function (req, res) {

    db.postData
      .update({ _id: req.params.id, "comments._id": req.body.commentId }, { $set: { "comments.$.comment": req.body.comment } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  addPics: function (req, res) {
    db.usersData
      .findOneAndUpdate({ _id: req.body.id }, { $push: { photos: req.body.photos } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  showPics: function (req, res) {

    db.usersData
      .findOne({ _id: req.body._id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  showPics2: function (req, res) {
    console.log(req.body)
    db.screenNameData
      .findByOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findScreenFriends: function (req, res) {

    const friendsList = [];
    for (var i = 0, len = req.body.friends.length; i < len; i++) {
      friendsList.push({ _id: req.body.friends[i] });
    }

    db.screenNameData
      .find({ $or: friendsList })


      .sort({ dateCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findScrFriendsPost: function (req, res) {

    const friendsPost = [];
    for (var i = 0, len = req.body.friends.length; i < len; i++) {
      friendsPost.push({ user_ID: req.body.friends[i] });
    }

    db.postData
      .find({ $or: friendsPost })


      .sort({ dateCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  createScreenInfo: function (req, res) {

    db.screenNameData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getScreenInfo: function (req, res) {
    

    db.screenNameData
      .findById({ _id: req.body._id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },

  addFriendsID2: function (req, res) {


    db.screenNameData
      .findOneAndUpdate({ _id: req.body.user_ID }, { $push: { friends: req.body.friends } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  deleteScrFriend: function (req, res) {

    db.screenNameData
      .findOneAndUpdate({ _id: req.body.user_ID }, { $pull: { friends: req.body.friends } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  update2: function (req, res) {

    db.screenNameData
      .findOneAndUpdate({ _id: req.body._id }, { $push: { post: req.body.post } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  findChats: function (req, res) {

    db.chatsData
      .findOne({ users: req.body.users })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },


  findUnreadChats: function (req, res) {

    db.chatsData
      .find({ users: req.body.user, receiverHasRead: false })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },




  updateRecHasRead: function (req, res) {
    db.chatsData
      .findOneAndUpdate({ users: req.body.users, receiverHasRead: false }, { $set: { receiverHasRead: true } })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },



  getAllChats: function (req, res) {

    db.chatsData
      .find({ user_id: req.body.user_id })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },

  updateMessage: function (req, res) {
    let theMessage = { content: req.body.content, sender: req.body.sender, picUrl: req.body.picUrl, vidUrl: req.body.vidUrl };



    db.chatsData
      .findByIdAndUpdate({ _id: req.params.id }, { receiverHasRead: req.body.receiverHasRead, $push: { messages: theMessage } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  saveChats: function (req, res) {


    db.chatsData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addScreenPics: function (req, res) {

    db.screenNameData
      .findOneAndUpdate({ _id: req.body.id }, { $push: { photos: req.body.photos } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addGroupToMem: function (req, res) {
    console.log(req)
    db.usersData
      .findOneAndUpdate({ _id:req.params.id }, { $push: { groups: {groupName: req.body.groupName, group_ID: req.body.group_ID} } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },




};
