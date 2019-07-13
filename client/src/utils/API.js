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

  getFriendsList: function(userData) {
    console.log(userData)
    return axios.post("/api/usersData/friendsLst",userData);

  },

 

  updateEditProfile:function(id,userData) {
    console.log(userData)
    console.log(id)
    return axios.put("/api/usersData/" +id, userData);
   
  },


 
  getUserInfo: function(userData) {
  
    return axios.post("/api/usersData",userData);
   
  },
  
 

 
  postID: function(userData) {
    console.log (userData)
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
    console.log(userData)
     return axios.post("/api/usersData/addFriend",userData);
    
   },

addPhotos:function(userData){


  return axios.post("/api/usersData/addPhoto",userData);
},

getPhotos: function(userData) {
  console.log(userData)
  return axios.post("/api/usersData/getPhotos",userData);

},


};
