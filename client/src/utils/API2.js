import axios from "axios";

export default{

getAllGroups:function(){
    return axios.get("/api/groupData")
},


createGroup: function(groupsData){
    return axios.post("/api/groupData",groupsData)
},

addGroupID: function(groupsData){
return axios.put("/api/groupData",groupsData)
},

getGroupPosts:function(id){
    return axios.post("/api/groupData/groupPosts",id)
},

findGroupInfo:function(id){
    return axios.post("/api/groupData/groupInfo",id)
},

savePost : function(postData) {
  console.log(postData)
    return axios.post("/api/groupData/posts",postData);
  
  },

  addPostId : function(postData) {
    console.log(postData)
    return axios.put("/api/groupData/posts",postData);
  
  },
  saveComment: function(id,postData){
  
    return axios.post("/api/groupData/postData/"+id,postData);

  },


  deleteComment: function(id,postData){
    return axios.put("/api/groupData/commentData/"+id,postData);

  },


  changePost: function(id,postData){
  
    return axios.put("/api/groupData/postData/"+id,postData);

  },


  editComment: function(id,postData){
  
    return axios.put("/api/groupData/editComment/"+id,postData);

  },




  likes: function(id,postData){
   
    return axios.post("/api/groupData/likeData/"+id,postData);

  },


  deleteLikes: function(id,postData){
    return axios.put("/api/groupData/likeData/"+id,postData);

  },

  deletePost: function(id){
    return axios.delete("/api/groupData/postData/"+id);

  },
  addMemToGrp:function(groupData){
    return axios.put("/api/groupData/addMemToGrp",groupData);

  },

  saveGrpNotification: function(id,Data){
   
  
    return axios.put("/api/groupData/notiData/"+id,Data);

  }, 
  removeGrpNotification: function(id,Data){
  
    return axios.put("/api/groupData/delNotiData/"+id,Data);

  },
  deleteMember: function(id,Data){
    return axios.put("/api/groupData/member/"+id,Data);

  },

  makeAdmin:function(id,Data){
  return axios.put("/api/groupData/makeAdmin/"+id,Data)
  },

  removeAdmin:function(id,Data){
    return axios.put("/api/groupData/removeAdmin/"+id,Data)
    },


    deleteGroup: function (id){
      return axios.delete("/api/groupData/removeGroup/"+id)
    }

}