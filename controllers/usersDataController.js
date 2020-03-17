const db = require("../models");

// Defining methods for the booksController
module.exports = {
   
  findUserPost: function(req, res) {
    db.usersData
     .findOne({ _id: req.body._id})
    
     .populate( "post")
     .sort({ dateCreated: 1 })
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

findAllUsers:function(req, res) {
 
  db.usersData
   .find()
   
   .then(dbModel => res.json(dbModel))
   .catch(err => res.status(422).json(err));
},
  
  findFriendsList: function(req, res) {
  
  const friendsList=[];
  for (var i =0,len=req.body.friends.length;  i < len;i++){
    friendsList.push({ _id: req.body.friends[i]});
  }
  
  db.usersData
    .find({$or:friendsList})
   
   
    .sort({ dateCreated: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
 },
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
   
    db.usersData
      .findByIdAndUpdate({ _id: req.params.id }, req.body.profileEdit,{new:true})
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

  connections: function(req, res) {
 
    db.usersData
      .findOneAndUpdate({ _id: req.body._id}, {$push:{friends: req.body.friends}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  updateComments: function(req, res) {
    
    db.postData
      .findByIdAndUpdate({ _id: req.params.id },  {$push:{comments: req.body}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateLikes: function(req, res) {
    console.log("controler")
    db.postData
      .findByIdAndUpdate({ _id: req.params.id },  {$push:{likes: req.body}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeLikes: function(req, res) {
    
    db.postData
    .findByIdAndUpdate({ _id: req.params.id },  {$pull:{likes: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  addPics: function(req, res) {
    db.usersData
      .findOneAndUpdate({ _id:req.body.id}, {$push:{photos: req.body.photos}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  showPics:function(req, res) {
  
    db.usersData
      .findOne({ _id: req.body._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  showPics2:function(req, res) {
  
    db.screenNameData
      .findOne({ _id: req.body._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findScreenFriends: function(req, res) {
  
    const friendsList=[];
    for (var i =0,len=req.body.friends.length;  i < len;i++){
      friendsList.push({ _id: req.body.friends[i]});
    }
    
    db.screenNameData
      .find({$or:friendsList})
     
     
      .sort({ dateCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
   },

   findScrFriendsPost: function(req, res) {
  
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


createScreenInfo: function(req, res) {
    
    db.screenNameData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getScreenInfo: function(req, res) {
    
    db.screenNameData
      .findOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },

  connections2: function(req, res) {
 
    db.screenNameData
      .findOneAndUpdate({ user_ID: req.body.user_ID}, {$push:{friends: req.body.friends}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  update2: function(req, res) {
   
    db.screenNameData
      .findOneAndUpdate({ _id: req.body._id}, {$push:{post: req.body.post}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  findChats:function(req, res) {
  
    db.chatsData
     .findOne({users:req.body.users})
     
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err));

  },

  updateMessage: function(req, res) {
   let theMessage={content:req.body.content,sender:req.body.sender};

  
    
    db.chatsData
      .findByIdAndUpdate({ _id: req.params.id },   {receiverHasRead:req.body.receiverHasRead, $push:{messages:theMessage}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },



  saveChats: function(req, res) {
    
   
    db.chatsData
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  addScreenPics: function(req, res) {
   
    db.screenNameData
      .findOneAndUpdate({ _id:req.body.id}, {$push:{photos: req.body.photos}},{new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
