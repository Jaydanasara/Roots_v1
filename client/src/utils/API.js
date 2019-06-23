import axios from "axios";

export default {
 
  getUsersPost: function(userData) {
   
    return axios.post("/api/usersData/usersPost",userData);

  },

  saveName: function(userData) {
    return axios.post("/api/usersData/usersData",userData);
  
  },

saveComment: function(id,postData){
  console.log(id)
  console.log(postData)
  return axios.post("/api/usersData/postData/"+id,postData);

},

  getFriendsPost: function(userData) {
    
    return axios.post("/api/usersData/friendsPost",userData);

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
    
    return axios.put("/api/usersData",userData);
  },
  
  savePost : function(postData) {
    
    return axios.post("/api/usersData/postData",postData);
   
  },
  saveFriend : function(friendsData) {
   
    return axios.post("/api/usersData/friendsData",friendsData);
   
  },
  friendID: function(friendsData) {
    
    return axios.put("/api/usersData/friendsData",friendsData);
  },

  deleteScore: function(id) {
    return axios.delete("/api/scores/" + id);
  },
  

};
