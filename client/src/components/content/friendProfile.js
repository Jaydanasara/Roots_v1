import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../../config/firebase";
import moment from "moment";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import EditPostModal from "../modal/editPostModal";
import EditCommentModal from "../modal/EditCommentModal";
import VideoPost from "../videoPost/VideoPost"
import NotificationModal from "../modal/NotificationModal";


class FriendProfile extends React.Component {
    state = {
        postID: "",
        statusPost: "",
        allUserPost: [],
        first_Name: "",
        last_Name: "",
        addFriend: true,
        userPic: "",
        comment: "",
        image: null,
        url: "",
        video: "",
        isActive: false,
        isActive2: false,
        progress: 0,
        checkInputID: null,
        whichComment: null,
        option_Id: "",
        edit_id: "",
        editContent: "",
        editPicture: "",
        comment_id: "",
        comOption_id: "",
        postComment_id: "",
        editComment: "",
        isNotiOpen:false,
        postId:"",
    }
    componentDidMount() {
        this.listPost()
        console.log(this.props)
    }


    listPost = () => {

        API.getUsersPost({ _id: this.props.userInfo.match.params.id })

            .then(res => {
                this.setState({ allUserPost: res.data.post, first_Name: res.data.firstname, last_Name: res.data.lastname, userPic: res.data.userPic }, () => this.postSort())
                console.log(res)


            })

            .catch(err => console.log(err));


    }


    postSort = () => {
        console.log("sortfunction")
        let sortPost = this.state.allUserPost.sort((a, b) => {
            if (a.dateCreated < b.dateCreated) return 1;
            else if (b.dateCreated < a.dateCreated) return -1;
            else return 0
        });

        this.setState({ allUserPost: sortPost })
    }


    submitPost = () => {
        API.savePost({
            content: this.state.statusPost,
            post_by: this.props.userInfo.userInfo.firstname + this.props.userInfo.userInfo.lastname,
            post_by_pic: this.props.userInfo.userInfo.userPic,
            user_ID: this.props.userInfo.userInfo.user_ID,
            picUrl: this.state.url,
            videoUrl: this.state.video,
        })
            .then(console.log(this.submitPost))
            .then(res => {


                this.setState({ postID: res.data._id, isActive: false }, () => this.addPostID());
                console.log(res)

            })

            .catch(err => console.log(err));


        this.setState({ statusPost: "" });

    }


    addPostID = () => {


        API.postID({
            _id: this.props.userInfo.userInfo.user_ID,
            post: this.state.postID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
        this.listPost()

    }


    addPostID2 = () => {


        API.postID({
            _id: this.props.userInfo.match.params.id,
            post: this.state.postID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));

    }

    submitFriendsPost = () => {
        API.savePost({
            content: this.state.statusPost,
            post_by: this.props.userInfo.userInfo.firstname + this.props.userInfo.userInfo.lastname,
            post_by_pic: this.props.userInfo.userInfo.userPic,
            user_ID: this.props.userInfo.userInfo.user_ID,
            picUrl: this.state.url,
            videoUrl: this.state.video,
        })

            .then(res => {


                this.setState({ postID: res.data._id, isActive: false }, () => this.addPostID2());
                console.log(res)

            })
            .then(result => {
                console.log(result)


                this.addPostID()

            })


            .catch(err => console.log(err));


        this.setState({ statusPost: "" });

    }



    submitComment = (id,posters_id) => {
        API.saveComment(id, {

            comment: this.state.comment,
            user_id: this.props.userInfo.user_ID,
            user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
            picUrl: this.state.url,
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

            let data ={
            comment: this.state.comment,
            user_id: this.props.userInfo.user_ID,
            name: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
            userPic: this.state.url,

            }
            if(this.props.userInfo.user_ID !== posters_id){

            this.props.saveNotification(posters_id,data,id)
            }

        this.refreshState()
        this.setState({ comment: "", checkInputID: null,postId:"" }, () => this.listFriendsPost());
    }


    handleLikes = (id) => {



        API.likes(id, {


            user_id: this.props.userInfo.userInfo.user_ID,
            user: this.props.userInfo.userInfo.firstname + " " + this.props.userInfo.userInfo.lastname,

        })
            .then(res => {

                console.log(res)
                this.listPost()
            })
            .catch(err => console.log(err));


        this.setState({ isliked: true })


    }

    removeLikes = (id) => {



        API.deleteLikes(id, {


            user_id: this.props.userInfo.userInfo.user_ID,
            user: this.props.userInfo.userInfo.firstname + " " + this.props.userInfo.userInfo.lastname,

        })
            .then(res => {

                console.log(res)
                this.listPost()
            })
            .catch(err => console.log(err));



    }





    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleChange2 =(postId,e)  => {


        this.setState({
            postId:postId,comment: e.target.value
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
        const fullName = this.props.userInfo.userInfo.firstname + "_" + this.props.userInfo.userInfo.lastname;
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

        if(this.state.url!==""){

        API.addPhotos({
            photos: this.state.url,
            id: this.props.userInfo.user_ID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));

    }else{

 API.addPhotos({
            photos: this.state.video,
            id: this.props.userInfo.user_ID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));

    }
    }
    addingFriend = () => {
        this.setState({ addFriend: !this.state.addFriend })



        API.saveFriend({
            friendName: this.state.first_Name + " " + this.state.last_Name,
            Friend_id: this.props.userInfo.match.params.id,
            addFriend: false,
            friendPic: this.state.userPic

        })
            .then(console.log(this.addingFriend))
            .then(res => {

                this.addfriendID()

                console.log(res)
            })

            .catch(err => console.log(err));


        this.listPost()

    }

    addfriendID = () => {


        API.friendID({
            _id: this.props.userInfo.userInfo.user_ID,
            friends: this.props.userInfo.match.params.id,
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));


        this.refreshState()
    }



    refreshState = () => {

        this.props.disState.getUser(this.props.userInfo.userInfo.emailaddress)

    }


    removeFriend = () => {



        API.unfriend({
            _id: this.props.userInfo.userInfo.user_ID,
            friends: this.props.userInfo.match.params.id,
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));


        this.refreshState()


    }


    optionsClicked = (id) => {


        if (this.state.option_Id === "") {

            this.setState({ option_Id: id })
        }
        else {
            this.setState({ option_Id: "" })

        }


        console.log(id)

    };

    commentOptions = (id) => {

        if (this.state.comOption_id === "") {

            this.setState({ comOption_id: id })
        }
        else {
            this.setState({ comOption_id: "" })
        }

    };


    removePost = (id) => {



        API.deletePost(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.refreshState()
        this.listPost()

        this.setState({ optionId: "" })




    }


    backdropClicked = () => {

        this.setState({ option_Id: "", comOption_id: "" })
    }


    editPostClicked = (id, content, picture) => {

        this.setState({ edit_id: id, editContent: content, editPicture: picture })


    }


    changeMessage = (id, content) => {


        API.changePost(id, {


            content: content

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.setState({ edit_id: "", editContent: "", editPicture: "" })

        this.refreshState()
        this.listPost()

    }



    changeComment = (id, commentId, content) => {

        API.editComment(id, {


            commentId: commentId,
            comment: content

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.setState({ postComment_id: "", editContent: "", editComment: "", editPicture: "", comment_id: "", })

        this.refreshState()
        this.listPost()

    }









    cancelEdit = () => {
        this.setState({ edit_id: "", editContent: "", editPicture: "" })


    }

    cancelEditComment = () => {
        this.setState({ postComment_id: "", editContent: "", editComment: "", editPicture: "", comment_id: "", })
    }

    removeComment = (id, commentID) => {

        API.deleteComment(id, {

            _id: commentID

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.refreshState()
        this.listPost()


    }


    editCommentClicked = (id, commentID, content, comment, picture) => {

        console.log(commentID)

        this.setState({ postComment_id: id, editContent: content, editComment: comment, editPicture: picture, comment_id: commentID, })


    }




    render() {
        const fullName = this.state.first_Name + " " + this.state.last_Name

        let backDrop;
        let editPost;
        let editComment;
        let notificationModal;
        if (this.state.option_Id !== "" || this.state.edit_id !== "" || this.state.comOption_id !== "" || this.state.comment_id !== "" || this.props.isNotiOpen===true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }

        if (this.state.edit_id !== "") {

            editPost = <EditPostModal postID={this.state.edit_id} content={this.state.editContent} picture={this.state.editPicture} cancelEdit={this.cancelEdit} changeMessage={this.changeMessage} commentID={this.state.comment_id} />;
        }

        if (this.state.comment_id !== "") {

            editComment = <EditCommentModal postID={this.state.postComment_id} content={this.state.editContent} picture={this.state.editPicture} cancelEditComment={this.cancelEditComment} changeComment={this.changeComment} commentID={this.state.comment_id} comment={this.state.editComment} />;
        }


        if(this.props.isNotiOpen===true){
            notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.userInfo.user_ID} username={this.props.userInfo.firstname +" "+this.props.userInfo.lastname} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
         }
 


        console.log(this.state.option_Id)

        return (

            <div className="contentArea ">
                 {notificationModal}
                {editPost}
                {backDrop}
                {editComment}


                <div className="profile-container">
                    <div className="profile-image">
                        <img src={(this.state.userPic !== undefined) ? this.state.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users pic" />
                    </div>
                    <div className="profile-info">
                        {fullName}
                    </div>
                    <div className="button-div">
                        <div className="follow-button" style={this.props.userInfo.match.params.id === this.props.userInfo.userInfo.user_ID ? { display: "visible" } : { display: "none" }}  > <Link to={"/editprofile/" + this.props.userInfo.userInfo.user_ID}>edit profile</Link>     </div>

                        {(this.props.userInfo.userInfo.friends.includes(this.props.userInfo.match.params.id)) ? <button className="friend-btn2" style={this.props.userInfo.match.params.id === this.props.userInfo.userInfo.user_ID ? { display: "none" } : { display: "visible" }} onClick={this.removeFriend}>Unfriend</button> : <button className="friend-btn" style={this.props.userInfo.match.params.id === this.props.userInfo.userInfo.user_ID ? { display: "none" } : { display: "visible" }} onClick={this.addingFriend}> <i id="friend-icon" className="fa fa-users fa-2x " aria-hidden="true" >+</i> </button>}
                        <button className="photos-btn" ><Link to={"/photos/" + this.props.userInfo.match.params.id}>Photos </Link> </button>
                        <button className="my-friends" ><Link to={"/friends/" + this.props.userInfo.match.params.id} >My_Friends </Link>  </button>
                    </div>
                </div>
                <section className="composeStatus">
                    <textarea name="statusPost" value={this.state.statusPost} onChange={this.handleChange} className="statusText" placeholder="Write on your friends wall" rows="8" cols="80" />
                    <div className="user-I">  <Link to={"/profile/" + this.props.userInfo.userInfo.user_ID}><img className="user-Img" src={(this.state.userPic !== undefined) ? this.state.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users pic" /> </Link>  </div>
                    <div className="buttons">

                        <button type="button" className="button photo" onClick={() => this.fileInput.click()}><i class="fas fa-camera-retro"></i></button>


                        <div className="button video"><i class="fas fa-video"></i></div>
                        <div className="button send">
                            <button type="submit" className="postbutton" onClick={this.state.statusPost === "" && this.state.url === ""  && this.state.video === "" ? null : this.submitFriendsPost}>Post </button>
                        </div>
                    </div>
                    <div>
                        <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
                        <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="previewupload" height="40" width="50" />

                        <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                        <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                        <span className={this.state.isActive ? "uploadReady active" : "uploadReady"}>File</span>
                    </div>
                </section>

                <section className="feed ">

                    {this.state.allUserPost.length ? (

                        <div>
                            {this.state.allUserPost.map(each => {
                                return (


                                    <div className="feed_Container" key={each._id}>
                                        <div className="friendsPostinfo">
                                            <div className="friends-I"><Link to={"/profile/" + each.user_ID}><img className="friendsImg" src={(each.post_by_pic !== undefined) ? each.post_by_pic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="friendspic" /> </Link> </div>
                                            <div className="friendsInfo"> <Link to={"/profile/" + each.user_ID}>{each.post_by}</Link> shared a &nbsp;
                                            <a href="/profile">{(each.picUrl === "") ? "story" : "image"}</a>  </div>
                                        </div>
                                        <div className="uploadedInfo">
                                            {(each.picUrl === "") ? <div className="story"> </div> :
                                                <div className="miniUpImage"><img className={`${(each.picUrl === "") ? "story" : "upImage"}`} src={each.picUrl} alt="uploaded pic" /></div>}

                                            <div className={(each.videoUrl === "") ? "noVideo" : "uploadedVideo"}> <VideoPost video={each.videoUrl} /></div>
                                        </div>
                                        <div className="colorBackground">
                                            <div className="updateInfo">
                                                <div className="timenOptions"> <div className="time">{moment(each.dateCreated).calendar()}</div>
                                                    <div className={(this.state.option_Id === each._id) ? "optionsContainer active" : "optionsContainer"} onClick={() => this.optionsClicked(each._id)} >

                                                        <div className={(each.user_ID === this.props.userInfo.userInfo.user_ID) ? "options" : "noOptions"}> ...</div>
                                                        <div className="optionsDropdown">
                                                            <ul className="optionsList">
                                                                <div className="edit" onClick={() => this.editPostClicked(each._id, each.content, each.picUrl)}> Edit</div>
                                                                <div className="delete" onClick={() => this.removePost(each._id)}>Delete</div>


                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>

                                                <p>{each.content}
                                                </p>

                                            </div>
                                            <div className="emojis">{

                                                each.likes.map((like) =>
                                                    <div className="likessection">
                                                        {(like.user_id === this.props.userInfo.userInfo.user_ID) ?
                                                            <div className="likeDisplay"> <i class="far fa-thumbs-up"></i> </div> : ""}
                                                    </div>
                                                )}
                                                {(each.likes.length === 0) ? <div className="friendsLiked">Be the first to like this</div>
                                                    : (each.likes.length === 1) ? <div className="friendsLiked">{each.likes.length} person likes this</div>
                                                        : <div className="friendsLiked">{each.likes.length} people likes this</div>}

                                                {(each.comments.length) ? <div className="numOfComments">{each.comments.length} comments </div> :
                                                    <div> </div>}
                                            </div>

                                            <div className="mapComments">{
                                                each.comments.map((comment, picUrl) =>
                                                    <div key={picUrl} className="commentList"><div className="timeStamp">{moment(comment.dateCreated).calendar()}<div>
                                                        <div className={(this.state.comOption_id === comment._id) ? "comOptionsContainer active" : "comOptionsContainer"} onClick={() => this.commentOptions(comment._id)} >
                                                            <button type="button" className={(comment.user_id === this.props.userInfo.userInfo.user_ID) ? "commentOptions" : "noOptions"} ><i class="far fa-comment-dots"></i></button>

                                                            <div className="comOptionsDropdown">
                                                                <ul className="optionsList">
                                                                    <div className="edit" onClick={() => this.editCommentClicked(each._id, comment._id, each.content, comment.comment, each.picUrl)}> Edit</div>
                                                                    <div className="delete" onClick={() => this.removeComment(each._id, comment._id)}>Delete</div>


                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </div> </div><span> &nbsp; <strong>{comment.user} </strong>  &nbsp; </span>   {comment.comment}
                                                        <div className={(comment.picUrl !== "") ? "commentPic" : "nocommentPic"}><img className="commentUrl" src={comment.picUrl} alt="comment pic" /></div></div>
                                                )}
                                                <div className="responseComments">
                                                    <textarea name="comment"  value={(each._id=== this.state.postId)?this.state.comment:""} onChange={e => this.handleChange2(each._id, e)} className="commentArea" placeholder="Comment" rows="8" cols="80" />
                                                    <div className="commentPhoto" >

                                                        <button type="button" className="button photo" onClick={() => { this.fileInput2.click(); this.getID(each._id); }}> <i class="far fa-images"></i></button>


                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected2} ref={fileInput => this.fileInput2 = fileInput} />
                                                    <img className={(this.state.checkInputID === each._id) ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="previewupload" height="40" width="50" />

                                                    <progress className={(this.state.checkInputID === each._id) ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                                                    <button className={(this.state.checkInputID === each._id) ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                                                    <span className={(this.state.checkInputID === each._id) ? "uploadReady active" : "uploadReady"}> File </span>


                                                </div>

                                                <div className="commentButtons">
                                                    <div className="replyButton" onClick={this.state.comment === "" && this.state.url === "" ? null : () => this.submitComment(each._id,each.user_ID)}  ><i class="fas fa-share"></i> </div>

                                                    <div className="likessection">

                                                        {(each.likes.findIndex(i => i.user_id === this.props.userInfo.userInfo.user_ID) > -1) ?
                                                            <div className="likeButton" onClick={() => this.removeLikes(each._id)}>Unlike</div>
                                                            : <div className="likeButton" onClick={() => this.handleLikes(each._id)}><i class="far fa-thumbs-up"></i> </div>

                                                        }
                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                );
                            })}
                        </div>

                    ) : (
                            <h1>No recent post to display</h1>
                        )}



                </section>


            </div>

        );
    }



}



export default FriendProfile;