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

  saveComment: function(id,postData){
  
    return axios.post("/api/usersData/postData/"+id,postData);

  },

  likes: function(id,postData){
    console.log("like working")
    return axios.post("/api/usersData/likeData/"+id,postData);

  },


  deleteLikes: function(id,postData){
    return axios.put("/api/usersData/likeData/"+id,postData);

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



  getUserInfo: function(userData) {
  
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


  deleteScore: function(id) {
    return axios.delete("/api/scores/" + id);
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
  saveChat : function(chatData) {
    console.log(chatData)
    return axios.post("/api/usersData/saveChData",chatData);
  
  },

  getAllMessages : function(chatData) {
    console.log(chatData)
    return axios.post("/api/usersData/getChData",chatData);
  
  },


  logMessage: function(id,chatData){
  
    return axios.post("/api/usersData/chatData/"+id,chatData);

  },


  getPhotos2: function(userData) {

    return axios.post("/api/usersData/getScrPhotos",userData);

  },


};
