const { get } = require("mongoose");
const db = require("../models");

module.exports = {

  create: function (req, res) {
    console.log("create")
    db.groupData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addGroupID: function (req, res) {


    db.usersData
      .findByIdAndUpdate({ _id: req.body.user_ID }, { $addToSet: { groups: req.body.group_ID, ownedGroups: req.body.group_ID } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  getGroupInfo: function (req, res) {

    db.groupData
      .findById({ _id: req.body._id })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },





  getAllGroupPosts: function (req, res) {

    db.groupPostData
      .find({ groupId: req.body.groupId })


      .sort({ dateCreated: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllGroups: function (req, res) {
    console.log("groups")
    db.groupData
      .find()

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addPostId: function (req, res) {

    db.groupData
      .findOneAndUpdate({ _id: req.body._id }, { $push: { post: req.body.post } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.groupData
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  createPost: function (req, res) {

    db.groupPostData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  updateComments: function (req, res) {

    db.groupPostData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getSinglePost: function (req, res) {

    db.groupPostData
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removePost: function (req, res) {

    db.groupPostData
      .findOneAndDelete({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  changePost: function (req, res) {


    db.groupPostData
      .findByIdAndUpdate({ _id: req.params.id }, { content: req.body.content })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateLikes: function (req, res) {
    console.log(req.params.id)
    db.groupPostData

      .findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeLikes: function (req, res) {

    db.groupPostData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeComment: function (req, res) {

    db.groupPostData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { comments: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  changeComment: function (req, res) {

    db.groupPostData
      .findOneAndUpdate({ _id: req.params.id, "comments._id": req.body.commentId }, { $set: { "comments.$.comment": req.body.comment } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  addPics: function (req, res) {
    db.groupPostData
      .findOneAndUpdate({ _id: req.body.id }, { $push: { photos: req.body.photos } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  showPics: function (req, res) {

    db.groupPostData
      .findOne({ _id: req.body._id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addMemberTogroup: function (req, res) {

    db.groupData
      .findOneAndUpdate({ _id: req.body.id },{$push: {members: {user_ID: req.body.groupMemID, userName: req.body.memName}}}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  saveGrpNotification: function (req, res) {
    db.groupData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  delGrpNotification: function (req, res) {

    db.groupData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { notifications: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

 removeMember: function (req, res) {

    db.groupData
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { members: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addAdmin: function (req, res) {
    db.groupData
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { admins: req.body } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  deleteAdmin: function (req,res) {
    db.groupData
    .findByIdAndUpdate({ _id: req.params.id }, { $pull: { admins: req.body } }, { new: true })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  deleteGroup: function (req, res) {

    db.groupData
      .findOneAndDelete({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}