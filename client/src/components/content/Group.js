import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import { storage } from "../../config/firebase";
import moment from "moment";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import EditPostModal from "../modal/editPostModal";
import EditCommentModal from "../modal/EditCommentModal";
import VideoPost from "../videoPost/VideoPost"
import NotificationModal from "../modal/NotificationModal";

import Card from "react-bootstrap/Card"

import './group.css'
import API2 from "../../utils/API2";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import DeleteGroupModal from "./DeleteGroupModal";
class Group extends React.Component {
  state = {
    postID: "",
    statusPost: "",
    allUserPost: [],
    image: null,
    url: "",
    video: "",
    isActive: false,
    isActive2: false,
    comment: "",
    checkInputID: null,
    whichComment: null,
    optionId: "",
    edit_id: "",
    editContent: "",
    editPicture: "",
    comment_id: "",
    comOption_id: "",
    postComment_id: "",
    editComment: "",
    isNotiOpen: false,
    postId: "",
    groupInfo: {},
    notificationsOpen: false,
    owner:"",
    isOwner:false,
    isBoss:false,
    show:false

  }


  componentDidMount() {
    console.log(this.props)

    this.getGroupInfo()
    this.getALLGroupPosts()

  }



  getALLGroupPosts = async () => {
    let res = await API2.getGroupPosts({ groupId: this.props.info.match.params.id })

    this.setState({ allUserPost: res.data})

  }



  getGroupInfo = async () => {

    let res = await API2.findGroupInfo({ _id: this.props.info.match.params.id })
    console.log(res.data)
    this.setState({ groupInfo: res.data });
    this.ownerCheck(res.data.owners, res.data.admins)

  }



  ownerCheck = (owners, admins) => {
    const findOwner = owners.find(owner => owner.user_ID === this.props.userInfo.scrUser_id || owner.user_ID === this.props.userInfo.user_ID)
        let boss=false
        let owner=true
        let ownerId=""
    if (findOwner !== undefined) {
      boss=true
      owner=true
      ownerId=findOwner.user_ID
    } else if (findOwner === undefined) {
      owner=false
      const findAdmin = admins.find(admin => admin.user_ID === this.props.userInfo.scrUser_id || admin.user_ID === this.props.userInfo.user_ID)
      if (findAdmin === undefined) {
        boss=false
       
      } else {
        boss=true
        
        
      }
    }

    this.setState({isBoss:boss, isOwner:owner, owner: ownerId})
  }




  submitPost = () => {
    API2.savePost({
      groupId: this.state.groupInfo._id,
      content: this.state.statusPost,
      post_by: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
      post_by_pic: this.props.userInfo.userPic,
      user_ID: this.props.userInfo.user_ID,
      picUrl: this.state.url,
      videoUrl: this.state.video,

    })

      .then(res => {
        console.log(res)

        this.setState({ postID: res.data._id }, () => this.addPostID());

      })

      .catch(err => console.log(err));


    this.refreshState()
    this.setState({ statusPost: "", isActive: false, url: "" }, () => this.getALLGroupPosts());


  }


  addPostID = () => {


    API2.addPostId({
      _id: this.state.groupInfo._id,
      post: this.state.postID
    })

      .then(res => console.log(res))
      .catch(err => console.log(err));

  }




  refreshState = () => {
    const updatePost = this.props.userInfo.emailaddress


    this.props.disState(updatePost)

  }





  submitComment = (id, posters_id) => {
    API2.saveComment(id, {

      comment: this.state.comment,
      user_id: this.props.userInfo.user_ID,
      user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
      picUrl: this.state.url,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    let data = {
      comment: this.state.comment,
      user_id: this.props.userInfo.user_ID,
      name: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
      userPic: this.state.url,

    }
    if (this.props.userInfo.user_ID !== posters_id) {

      this.props.saveNotification(posters_id, data, id)
    }

    this.refreshState()
    this.setState({ comment: "", checkInputID: null, postId: "" }, () => this.getALLGroupPosts());
  }


  handleLikes = (id) => {


    console.log(id)
    API2.likes(id, {


      user_id: this.props.userInfo.user_ID,
      user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.refreshState()
    this.getALLGroupPosts();


  }




  removeLikes = (id) => {

    API2.deleteLikes(id, {

      user_id: this.props.userInfo.user_ID,
      user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.refreshState()
    this.getALLGroupPosts();

  }





  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value
    });
  };



  handleChange2 = (postId, e) => {

    this.setState({
      postId: postId, comment: e.target.value
    });
  };




  handleImageSelected = event => {


    if (event.target.files[0]) {
      const image = event.target.files[0];
      let extention = image.name.substring(image.name.lastIndexOf(".") + 1)
      console.log(extention)
      if (extention === "mp4" || extention === "mpg" || extention === "wmv" || extention === "mpeg"
        || extention === "jpg" || extention === "gif" || extention === "png" || extention === "jpeg") {

        this.setState(() => ({ image }));
        this.uploadClick()
      }
      else {
        alert("R.O.O.T.S does not accept this file format")
      }



    }



  }

  handleImageSelected2 = event => {

    if (event.target.files[0]) {
      const image = event.target.files[0];
      let extention = image.name.substring(image.name.lastIndexOf(".") + 1)
      console.log(extention)
      if (extention === "mp4" || extention === "mpg" || extention === "wmv" || extention === "mpeg"
        || extention === "jpg" || extention === "gif" || extention === "png" || extention === "jpeg") {

        this.setState(() => ({ image }));
        this.commentClick(this.state.whichComment)
      }
      else {
        alert("R.O.O.T.S does not accept this file format")
      }

    }

  }


  handleUpload = () => {
    const fullName = this.state.groupInfo.groupName;
    const { image } = this.state;

    const uploadTask = storage.ref(fullName + "/" + image.name).put(image);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress: progress })
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage.ref(fullName).child(image.name).getDownloadURL()
          .then(url => {
            let extention = image.name.substring(image.name.lastIndexOf(".") + 1)
            console.log(extention)
            if (extention === "mp4" || extention === "mpg" || extention === "wmv" || extention === "mpeg") {
              this.setState({ video: url }, () => this.addToPhotos());
            }
            else {

              this.setState({ url: url }, () => this.addToPhotos());
              console.log(url)
            }
          })
      });
  }

  uploadClick = () => {

    this.setState({ isActive: !this.state.isActive })
  };

  commentClick = (checkNumber) => {


    this.setState({ checkInputID: checkNumber })
  };

  getID = (id) => {
    this.setState({ whichComment: id })
  }

  addToPhotos = () => {

    if (this.state.url !== "") {

      API2.addPhotos({
        photos: this.state.url,
        id: this.state.groupInfo._id
      })

        .then(res => console.log(res))
        .catch(err => console.log(err));

    } else {

      API2.addPhotos({
        photos: this.state.video,
        id: this.state.groupInfo._id
      })

        .then(res => console.log(res))
        .catch(err => console.log(err));

    }
  }

  optionsClicked = (id) => {

    if (this.state.optionId === "") {

      this.setState({ optionId: id })
    }
    else {
      this.setState({ optionId: "" })
    }

  };

  commentOptions = (id,) => {

    if (this.state.comOption_id === "") {

      this.setState({ comOption_id: id })
    }
    else {
      this.setState({ comOption_id: "" })
    }

  };


  removePost = (id) => {



    API2.deletePost(id)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.refreshState()
    this.getALLGroupPosts();

    this.setState({ optionId: "" })




  }


  backdropClicked = () => {

    this.setState({ optionId: "", comOption_id: "" })
    this.props.notiClose()

  }


  editPostClicked = (id, content, picture) => {

    this.setState({ edit_id: id, editContent: content, editPicture: picture })


  }


  changeMessage = (id, content) => {


    API2.changePost(id, {


      content: content

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({ edit_id: "", editContent: "", editPicture: "" })

    this.refreshState()
    this.getALLGroupPosts();

  }



  changeComment = (id, commentId, content) => {

    API2.editComment(id, {


      commentId: commentId,
      comment: content

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({ postComment_id: "", editContent: "", editComment: "", editPicture: "", comment_id: "", })

    this.refreshState()
    this.getALLGroupPosts();

  }









  cancelEdit = () => {
    this.setState({ edit_id: "", editContent: "", editPicture: "" })


  }

  cancelEditComment = () => {
    this.setState({ postComment_id: "", editContent: "", editComment: "", editPicture: "", comment_id: "", })
  }

  removeComment = (id, commentID) => {

    API2.deleteComment(id, {

      _id: commentID

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.refreshState()
    this.getALLGroupPosts();


  }


  editCommentClicked = (id, commentID, content, comment, picture) => {

    this.setState({ postComment_id: id, editContent: content, editComment: comment, editPicture: picture, comment_id: commentID, })


  }

  showNotifications = () => {
    

    let allNotifications = this.props.notifications

    if (allNotifications.length === 0) {
      return null;
    }
    console.log(allNotifications)
    if (this.state.notificationsOpen === true) {

      return (
        <ul className="messageList"> 
          {allNotifications.map((each) => <li className="eachNotification" ><img className="search-Img" src={(each.userPic !== undefined && each.userPic !== "") ?
           each.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" />
           <div className="noteContent">{each.content}</div> 
           <div className="grpButtonDiv"><button className="accept" onClick={() =>this.addToGroup(each.user_id, each.name, each.receiver, each.receiverName, each._id)}>accept</button>
           <button className="refuse" onClick={() => this.props.removeNotification(each.receiver, each._id)}>refuse</button></div></li>)}
        </ul>
      )
    }

  }

  openNotifications = () => {
      
    if (this.state.notificationsOpen === false) {
        this.setState({ notificationsOpen: true })
    }
    else if (this.state.notificationsOpen === true) {
        this.setState({ notificationsOpen: false })

    }
}


addToGroup =async (user_id, name, receiver,receiverName,) => {
 

  let res =await API.addGrpIdToMember(user_id,{groupName:receiverName, group_ID:receiver})
  console.log(res)

  let response = await API2.addMemToGrp({
      id:receiver, 
      groupMemID: user_id,
     memName:name
    
     })
  console.log(response)



}



deleteGroup =async ()=>{
 let res = await API2.deleteGroup(this.props.info.match.params.id)

 console.log(res)


}


handleClose = () => this.setState({show:false});
 handleShow = () => this.setState({show:true});


  render() {
    const user = this.props.userInfo
  
   


    let backDrop;
    let editPost;
    let editComment;
    let notificationModal;

    if (this.state.optionId !== "" || this.state.edit_id !== "" || this.state.comOption_id !== "" || this.state.comment_id !== "" || this.props.isNotiOpen === true) {
      backDrop = <BackDrop click={this.backdropClicked} />;
    }

    if (this.state.edit_id !== "") {

      editPost = <EditPostModal postID={this.state.edit_id} content={this.state.editContent} picture={this.state.editPicture} cancelEdit={this.cancelEdit} changeMessage={this.changeMessage} commentID={this.state.comment_id} />;
    }

    if (this.state.comment_id !== "") {

      editComment = <EditCommentModal postID={this.state.postComment_id} content={this.state.editContent} picture={this.state.editPicture} cancelEditComment={this.cancelEditComment} changeComment={this.changeComment} commentID={this.state.comment_id} comment={this.state.editComment}
        viewNotiPost={this.props.viewNotiPost} />;
    }

    if (this.props.isNotiOpen === true) {
      notificationModal = <NotificationModal userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.userInfo.user_ID} username={this.props.userInfo.firstname + " " + this.props.userInfo.lastname} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
    }

    return (

     



      <div className="grpContentArea ">
        {notificationModal}
        {editPost}
        {backDrop}
        {editComment}


        <div className="cardWrapper">
          <Card >
            <Card.Img variant="top" src="/groups2.png" style={{ maxHeight: '8rem', maxWidth: "50% " }} />
            <Card.Body>
              <Card.Title>
                <div className="groupNameContainer">
                  <h2 className="groupName">{this.state.groupInfo.groupName}</h2>
                </div>
              </Card.Title>
            </Card.Body>
          </Card>
         
        </div>

        <div className="innerContainer">
        
          <div className="grpButtons">
          
          {(Object.keys(this.state.groupInfo).length >0)? <div>{(this.state.isBoss==true) ?
              <button className="grpNotifications" onClick={()=>this.openNotifications()}>Notifications {(this.props.newNotifications > 0) ? this.props.newNotifications : null}</button>
              :null}
            </div>:null}
            <Link to ={"/viewMembers/"+this.state.groupInfo._id}> <button className="members" >Members</button> </Link>
            <button className="photos">Group Photos</button>
            <Link to={"/addmember/" + this.props.info.match.params.id}> <button className="addMembers" type="button">Add Members</button></Link>
            <button className="events">Events</button>
            { (this.state.isOwner===true)?<button type="button"className="deleteGroup" onClick={()=>this.handleShow() }>Delete Group</button>:null}

          </div>

          <section className="composeStatus">
          <div className={(this.state.notificationsOpen === true) ? "instMessages" : "noMessages"} > 
                            {this.showNotifications()}

                        </div>
            <textarea name="statusPost" value={this.state.statusPost} onChange={this.handleChange} className="statusText" placeholder="Say somthing to the group" rows="8" cols="80" />
            <div className="user-I">   <Link to={"/profile/" + this.props.userInfo.user_ID}><img className="user-Img" src={(user.userPic !== undefined && user.userPic !== "") ? user.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users_Pic" /> </Link>  </div>
            <div className="buttons">

              <button type="button" className="button photo" onClick={() => this.fileInput.click()}><i className="fas fa-camera-retro"></i></button>


              <div className="button video"><i className="fas fa-video"></i> </div>
              <div className="button send">
                <button type="submit" className="postbutton" onClick={this.state.statusPost === "" && this.state.url === "" && this.state.video === "" ? null : () => this.submitPost()}>Post </button>
              </div>

            </div>
            <div>
              <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
              <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="previewUpload" src={this.state.url} alt="preview" height="40" width="50" />
            </div>
            <div>
              <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="progress" value={this.state.progress} max="100" />
              <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
              <span className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="file"> File </span>
            </div>
          </section>

          <section className="feed ">

            {this.state.allUserPost.length ? (

              <div>
                {this.state.allUserPost.map(content => {

                  return (


                    <div className="feed_Container" key={content._id} >
                      <div className="friendsPostinfo">
                        <Link to={"/friendProfile/" + content.user_ID}> <img className="friendsImg" src={(content.post_by_pic !== undefined && content.post_by_pic !== "") ? content.post_by_pic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="friendspic" /></Link>
                        <div className="friendsInfo"> <Link to={"/friendProfile/" + content.user_ID} className="Link">{content.post_by}</Link> &nbsp; shared a &nbsp; <a href="#">{(content.picUrl === "") ? "story" : "image"}</a>  </div>
                      </div>
                      <div className="uploadedInfo">
                        {(content.picUrl === "") ? <div className="story"> </div> :
                          <div className="miniUpImage"><img className={`${(content.picUrl === "") ? "story" : "miniUpImage"}`} src={content.picUrl} alt="uploaded pic" /></div>
                        }

                        <div className={(content.videoUrl === "") ? "noVideo" : "uploadedVideo"}> <VideoPost video={content.videoUrl} /></div>
                      </div>
                      <div className="colorBackground">
                        <div className="updateInfo">
                          <div className="timenOptions"> <div className="time">{moment(content.dateCreated).calendar()}</div>
                            <div className={(this.state.optionId === content._id) ? "optionsContainer active" : "optionsContainer"} onClick={() => this.optionsClicked(content._id)} >

                              <div className={(content.user_ID === this.props.userInfo.user_ID) ? "options" : "noOptions"}> ...</div>
                              <div className="optionsDropdown">
                                <ul className="optionsList">
                                  <div className="edit" onClick={() => this.editPostClicked(content._id, content.content, content.picUrl)}> Edit</div>
                                  <div className="delete" onClick={() => this.removePost(content._id)}>Delete</div>


                                </ul>
                              </div>
                            </div>

                          </div>
                          <p>{content.content}
                          </p>

                        </div>
                        <div className="emojis">{

                          content.likes.map((like) =>
                            <div className="likessection">
                              {(like.user_id === this.props.userInfo.user_ID) ?
                                <div className="likeDisplay"> <i class="far fa-thumbs-up"></i> </div> : ""}
                            </div>
                          )}
                          {(content.likes.length === 0) ? <div className="friendsLiked">Be the first to like this</div>
                            : (content.likes.length === 1) ? <div className="friendsLiked">{content.likes.length} person likes this</div>
                              : <div className="friendsLiked">{content.likes.length} people likes this</div>}

                          {(content.comments.length) ? <div className="numOfComments">{content.comments.length} comments </div> :
                            <div> </div>}
                        </div>

                        <div className="mapComments">{
                          content.comments.map((comment, picUrl) =>
                            <div key={picUrl} className="commentList"><div className="timeStamp">{moment(comment.dateCreated).calendar()}<div>
                              <div className={(this.state.comOption_id === comment._id) ? "comOptionsContainer active" : "comOptionsContainer"} onClick={() => this.commentOptions(comment._id)} >
                                <button type="button" className={(comment.user_id === this.props.userInfo.user_ID) ? "commentOptions" : "noOptions"} ><i className="far fa-comment-dots"></i></button>

                                <div className="comOptionsDropdown">
                                  <ul className="optionsList">
                                    <div className="edit" onClick={() => this.editCommentClicked(content._id, comment._id, content.content, comment.comment, content.picUrl)}> Edit</div>
                                    <div className="delete" onClick={() => this.removeComment(content._id, comment._id)}>Delete</div>


                                  </ul>
                                </div>
                              </div>

                            </div> </div><span> &nbsp; <strong>{comment.user} </strong>  &nbsp; </span>   {comment.comment}
                              <div className={(comment.picUrl !== "") ? "commentPic" : "nocommentPic"}><img className="commentUrl" src={comment.picUrl} alt="comment pic" /></div></div>
                          )}
                          <div className="responseComments">
                            <textarea name="comment" value={(content._id === this.state.postId) ? this.state.comment : ""} onChange={e => this.handleChange2(content._id, e)} className="commentArea" placeholder="Comment" rows="8" cols="80" />

                            <div className="commentPhoto">
                              <button type="button" className="button photo" onClick={() => { this.fileInput2.click(); this.getID(content._id); }}> <i className="far fa-images"></i></button>


                            </div>

                          </div>
                          <div>

                            <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected2} ref={fileInput => this.fileInput2 = fileInput} />
                            <img className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="preview" height="40" width="50" />

                            <progress className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                            <button className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                            <span className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"}>File </span>
                          </div>

                          <div className="commentButtons">
                            <div className="replyButton" onClick={this.state.comment === "" && this.state.url === "" ? null : () => this.submitComment(content._id, content.user_ID)} ><i className="fas fa-share"></i> </div>

                            <div className="likessection">

                              {(content.likes.findIndex(i => i.user_id === this.props.userInfo.user_ID) > -1) ?
                                <div className="likeButton" onClick={() => this.removeLikes(content._id)}>Unlike</div>
                                : <div className="likeButton" onClick={() => this.handleLikes(content._id)}><i className="far fa-thumbs-up"></i></div>

                              }
                            </div>


                          </div>

                        </div>




                      </div>

                    </div>

                  );
                })
                }
              </div>

            ) : (
              <h1>No recent post to display</h1>
            )}



          </section>

        </div>

              <DeleteGroupModal deleteGroup={this.deleteGroup} handleClose={this.handleClose} handleShow={this.handleShow} show={this.state.show}/>
      </div>

    );
  }



}



export default Group;






