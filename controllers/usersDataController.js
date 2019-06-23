const db = require("../models");

// Defining methods for the booksController
module.exports = {
   
  findUserPost: function(req, res) {
    db.usersData
     .findOne({ _id: req.body._id})
    
     .populate( "post")
     .sort({ dateCreated: -1 })
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err));
 },
 findFriendsPost: function(req, res) {
  
 const friendsPost=[];
 for (var i =0,len=req.body.friends.length;  i < len;i++){
   friendsPost.push({ user_ID: req.body.friends[i]});
 }
 
 db.postData
   .find({$or:friendsPost})
  
  
   .sort({ dateCreated: -1 })
   .then(dbModel => res.json(dbModel))
   .catch(err => res.status(422).json(err));
},

  
findUserinfo:function(req, res) {
 
  db.usersData
   .find({emailaddress:req.body.emailaddress})
   
   .then(dbModel => res.json(dbModel))
   .catch(err => res.status(422).json(err));
},
  
  // findById: function(req, res) {
  //   db.usersData
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    
    db.usersData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
  
    db.usersData
      .findOneAndUpdate({ _id: req.body._id}, {$push:{post: req.body.post}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.usersData
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateByID: function(req, res) {
    console.log(res)
    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  createPost: function(req, res) {
   
    db.postData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createFriend: function(req, res) {
  
    db.friendsData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateFriends: function(req, res) {
  
    db.usersData
      .findOneAndUpdate({ _id: req.body._id}, {$push:{friends: req.body.friends}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  updateComments: function(req, res) {
    console.log(req)
    db.postData
      .findByIdAndUpdate({ _id: req.params.id },  {$push:{comments: req.body}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
};
