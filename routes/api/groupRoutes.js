const router=require("express").Router();
const groupDataController = require ("../../controllers/groupDataController")

router
  .route("/")
  .get(groupDataController.findAllGroups)
  .post(groupDataController.create)
  .put(groupDataController.addGroupID)

 



  router
  .route("/groupPosts")
  .post(groupDataController.getAllGroupPosts)

  router
  .route("/groupInfo")
  .post(groupDataController.getGroupInfo)


  router
  .route("/posts")
  .post(groupDataController.createPost)
  .put(groupDataController.addPostId)


  router
  .route("/postData/:id")
  .post(groupDataController.updateComments)
  .delete(groupDataController.removePost)
  .put(groupDataController.changePost)


router
  .route("/likeData/:id")
  .post(groupDataController.updateLikes)
  .put(groupDataController.removeLikes);


  

router
  .route("/commentData/:id")
  .put(groupDataController.removeComment);

router
  .route("/editComment/:id")
  .put(groupDataController.changeComment);

  router
  .route("/addMemToGrp")
  .put(groupDataController.addMemberTogroup);

  router
  .route("/notiData/:id")
  .put(groupDataController.saveGrpNotification);

  router
  .route("/delNotiData/:id")
  .put(groupDataController.delGrpNotification);

  router
  .route("/member/:id")
  .put(groupDataController.removeMember);


  router
  .route("/makeAdmin/:id")
  .put(groupDataController.addAdmin);

  router
  .route("/removeAdmin/:id")
  .put(groupDataController.deleteAdmin);


 router
  .route("/removeGroup/:id")
  .delete(groupDataController.deleteGroup);
module.exports = router;