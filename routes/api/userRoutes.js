const router = require("express").Router();
const usersDataController = require("../../controllers/usersDataController");

// Matches with "/api/books"
router.route("/")
  .post(usersDataController.findUserinfo)
  .put(usersDataController.update)
  router.route("/:id")
  .put(usersDataController.updateByID);

  router
  .route("/usersData")
  .post(usersDataController.create);
  
 
 
  router
  .route("/postData/:id")
  .post(usersDataController.updateComments);
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
  .route("/friendsData")
  .post(usersDataController.createFriend)
  .put(usersDataController.updateFriends);


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
