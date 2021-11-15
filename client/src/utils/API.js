import axios from "axios";


export default  {
 
  getUsersPost: function(userData) {
  
    return axios.post("/api/usersData/usersPost",userData);

  },

  getScrUsersPost: function(userData) {
    
     return axios.post("/api/usersData/scrUsersPost",userData);
 
   },

  saveName: function(userData) {
    return axios.post("/api/usersData/usersData",userData);
  
  },


  addScrId: function(userData) {
    console.log(userData)
    return axios.post("/api/usersData/scrUData",userData);
  
  },

  saveComment: function(id,postData){
  
    return axios.post("/api/usersData/postData/"+id,postData);

  },


  deleteComment: function(id,postData){
    return axios.put("/api/usersData/commentData/"+id,postData);

  },


  changePost: function(id,postData){
  
    return axios.put("/api/usersData/postData/"+id,postData);

  },


  editComment: function(id,postData){
  
    return axios.put("/api/usersData/editComment/"+id,postData);

  },




  likes: function(id,postData){
    console.log("like working")
    return axios.post("/api/usersData/likeData/"+id,postData);

  },


  deleteLikes: function(id,postData){
    return axios.put("/api/usersData/likeData/"+id,postData);

  },

  deletePost: function(id){
    return axios.delete("/api/usersData/postData/"+id);

  },




  getFriendsPost: function(userData) {
    
    return axios.post("/api/usersData/friendsPost",userData);

  },

  getScrFriendsPost: function(userData) {
    
    return axios.post("/api/usersData/scrFriendsPost",userData);

  },





  getFriendsList: function(userData) {
    
    return axios.post("/api/usersData/friendsLst",userData);

  },

  getScreenFriends: function(userData) {
   
    return axios.post("/api/usersData/screenFriendsLst",userData);

  },

  updateEditProfile:function(id,userData) {
    
    return axios.put("/api/usersData/" +id, userData);
  
  },


  updateEditScreenProfile:function(id,userData) {
    
    return axios.put("/api/usersData/scProData" +id, userData);
  
  },



  getUserInfo: function(userData) {
    console.log(userData)
  
    return axios.post("/api/usersData",userData);
  
  },

  getFriendsinfo: function(userData) {
  
    return axios.post("/api/usersData/getFriendsInfo",userData);
  
  },
  

  getAllUsers:function(){
  
    return axios.get("/api/usersData");
  },

  getScrUsers:function(){
    console.log("second part ")
    return axios.get("/api/usersData/screenData");
  },

  postID: function(userData) {
  
    return axios.put("/api/usersData",userData);
  },
  
  savePost : function(postData) {
    console.log(postData)
    return axios.post("/api/usersData/postData",postData);
  
  },
  saveFriend : function(friendsData) {
  
    return axios.post("/api/usersData/friendsData",friendsData);
  
  },



  
  friendID: function(userData) {
   
     return axios.post("/api/usersData/addFriend",userData);
    
   },

  unfriend: function(userData) {
   
    return axios.post("/api/usersData/removeFriend",userData);
   
  },



  addPhotos:function(userData){


    return axios.post("/api/usersData/addPhoto",userData);
  },

  getPhotos: function(userData) {

    return axios.post("/api/usersData/getPhotos",userData);

  },

  saveScreenName: function(userData) {
    
    return axios.post("/api/usersData/screenData",userData);

  },

  saveScreenFriend: function(userData) {
    console.log(userData);
    return axios.post("/api/usersData/screenData",userData);

  },

  getScreenNameInfo: function(userData) {
    
    return axios.post("/api/usersData/getScreenName",userData);

  },

  friendID2: function(userData) {
    console.log(userData)
    
    return axios.post("/api/usersData/addScFriend",userData);
    
  },

  removeScrFriend: function(userData) {
    console.log(userData)
    return axios.post("/api/usersData/deleteScFriend",userData);
    
  },

  postID2: function(userData) {
    
    return axios.put("/api/usersData/addScreenPhoto",userData);
  },

  addScreenPhotos:function(userData){


    return axios.post("/api/usersData/addScreenPhoto",userData);
  },

  getConvo: function(chatData) {
    
    return axios.post("/api/usersData/chatData",chatData);
  
  },


  getUnreadChats: function(chatData) {
    
    return axios.post("/api/usersData/getChatData",chatData);
  
  },

  receiverHasRead: function(chatData) {
   
    return axios.post("/api/usersData/readChatData",chatData);
  
  },


  saveChat : function(chatData) {
   
    return axios.post("/api/usersData/saveChData",chatData);
  
  },

  getAllMessages : function(chatData) {
    console.log(chatData)
    return axios.post("/api/usersData/getChData",chatData);
  
  },


  logMessage: function(id,chatData){
  
    return axios.post("/api/usersData/chatData/"+id,chatData);

  },

  saveInstantMessage: function(id,Data){
  
    return axios.put("/api/usersData/instData/"+id,Data);

  },

  saveNotification: function(id,Data){
   
  
    return axios.put("/api/usersData/notiData/"+id,Data);

  },

  saveSCNotification: function(id,Data){
  
    return axios.put("/api/usersData/notiSCData/"+id,Data);

  },

  removeMessages: function(id){
  
    return axios.put("/api/usersData/delInstData/"+id);

  },

  removeNotification: function(id,Data){
  
    return axios.put("/api/usersData/delNotiData/"+id,Data);

  },

  removeSCNotification: function(id,Data){
  
    return axios.put("/api/usersData/delSCNotiData/"+id,Data);

  },

  getNotiPost: function(id){
  
    return axios.get("/api/usersData/notiData/"+id);

  },

  saveSCInstantMessage: function(id,Data){
  
    return axios.put("/api/usersData/SCinstData/"+id,Data);

  },

  removeSCMessages: function(id){
  
    return axios.put("/api/usersData/delSCInstData/"+id);

  },


  getPhotos2: function(userData) {

    return axios.put("/api/usersData/getScrPhotos",userData);

  },
  addGrpIdToMember:function(id,userData){
    console.log(userData)
    return axios.put("/api/usersData/addGrpToMem/"+id,userData);
  }


};
