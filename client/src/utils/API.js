import axios from "axios";

export default {
 
  getUsersPost: function(userData) {
   
    return axios.post("/api/usersData/usersPost",userData);

  },

  saveName: function(userData) {
    return axios.post("/api/usersData/usersData",userData);
  
  },

saveComment: function(id,postData){
 
  return axios.post("/api/usersData/postData/"+id,postData);

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
  
 

 
  postID: function(userData) {
   
    return axios.put("/api/usersData",userData);
  },
  
  savePost : function(postData) {
    
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

addPhotos:function(userData){


  return axios.post("/api/usersData/addPhoto",userData);
},

getPhotos: function(userData) {

  return axios.post("/api/usersData/getPhotos",userData);

},

saveScreenName: function(userData) {
  
  return axios.post("/api/usersData/screenData",userData);

},

getScreenNameInfo: function(userData) {
  
  return axios.post("/api/usersData/getScreenName",userData);

},

friendID2: function(userData) {
  
   return axios.post("/api/usersData/addScFriend",userData);
  
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

logMessage: function(id,chatData){
 
  return axios.post("/api/usersData/chatData/"+id,chatData);

},


getPhotos2: function(userData) {

  return axios.post("/api/usersData/getScrPhotos",userData);

},


};
