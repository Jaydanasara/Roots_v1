const router = require("express").Router();
const usersDataController = require("../../controllers/usersDataController");

// Matches with "/api/books"
router
  .route("/")
  .post(usersDataController.findUserinfo)
  .put(usersDataController.update)
  .get(usersDataController.findAllUsers)

  router
  .route("/addScreenPhoto")
  .put(usersDataController.update2)



  router.route("/:id")
  .put(usersDataController.updateByID);

  router
  .route("/usersData")
  .post(usersDataController.create)
 
  
  router
  .route("/friendsLst")
  .post(usersDataController.findFriendsList)

  router
  .route("/screenFriendsLst")
  .post(usersDataController.findScreenFriends)


  router
  .route("/postData/:id")
  .post(usersDataController.updateComments);

  router
  .route("/likeData/:id")
  .post(usersDataController.updateLikes);

  router
  .route("/likeData/:id")
  .put(usersDataController.removeLikes);

  router
  .route("/postData")
  .post(usersDataController.createPost)

  router
  .route("/usersPost")
  .post(usersDataController.findUserPost);

  router
  .route("/friendsPost")
  .post(usersDataController.findFriendsPost);


  router
  .route("/ScrFriendsPost")
  .post(usersDataController.findScrFriendsPost);


  router
  .route("/friendsData")
  .post(usersDataController.createFriend);
 
  router
  .route("/addFriend")
  .post(usersDataController.connections);

  router
  .route("/addPhoto")
  .post(usersDataController.addPics);

  router
  .route("/getPhotos")
  .post(usersDataController.showPics);

router
.route("/getScrPhotos")
.post(usersDataController.showPics2);

  router
  .route("/screenData")
  .post(usersDataController.createScreenInfo);

  router
  .route("/addScFriend")
  .post(usersDataController.connections2);
  
 
  router
  .route("/getScreenName")
  .post(usersDataController.getScreenInfo);

  router
  .route("/addScreenPhoto")
  .post(usersDataController.addScreenPics);


  router
  .route("/chatData")
  .post(usersDataController.findChats);

  router
  .route("/chatData/:id")
  .post(usersDataController.updateMessage);
  

  router
  .route("/saveChData")
  .post(usersDataController.saveChats);

  router
  .route("/addScreenPhoto")
  .put(usersDataController.update2);


 



// // Matches with "/api/books/:id"
// router
//   .route("/usersData")
//   .post(usersDataController.create)
//   // .post(usersDataController.findUserinfo)
//    
//   // .get(usersDataController.findAll)
//   // .put(usersDataController.update)
//   // .delete(usersDataController.remove);

module.exports = router;
