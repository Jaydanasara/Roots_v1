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



class Content extends React.Component {
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
        isNotiOpen:false,
        postId:"",






    }
    componentDidMount() {
        console.log(this.props)

   

        this.listFriendsPost()

    }




    listFriendsPost = () => {

        if(this.props.userInfo.friends.length){

        
            API.getFriendsPost({ friends: this.props.userInfo.friends, })

                .then(res => {

                    this.setState({ allUserPost: res.data })
                    console.log(res.data)


                })

                .catch(err => console.log(err));
            }

    }








    submitPost = () => {
        API.savePost({
            content: this.state.statusPost,
            post_by: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,
            post_by_pic: this.props.userInfo.userPic,
            user_ID: this.props.userInfo.user_ID,
            picUrl: this.state.url,
            videoUrl: this.state.video,
            progress: 0
        })
            .then(console.log(this.submitPost))
            .then(res => {


                this.setState({ postID: res.data._id }, () => this.addPostID());

            })

            .catch(err => console.log(err));


        this.refreshState()
        this.setState({ statusPost: "", isActive: false, url: "" }, () => this.listFriendsPost());


    }


    addPostID = () => {


        API.postID({
            _id: this.props.userInfo.user_ID,
            post: this.state.postID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));




    }




    refreshState = () => {
        const updatePost = this.props.userInfo.emailaddress
            
        
        this.props.disState(updatePost)

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
        this.setState({ comment: "", checkInputID: null, postId:""}, () => this.listFriendsPost());
    }


    handleLikes = (id) => {



        API.likes(id, {


            user_id: this.props.userInfo.user_ID,
            user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.refreshState()
        this.listFriendsPost();


    }




    removeLikes = (id) => {



        API.deleteLikes(id, {


            user_id: this.props.userInfo.user_ID,
            user: this.props.userInfo.firstname + " " + this.props.userInfo.lastname,

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.refreshState()
        this.listFriendsPost();


    }





    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };



    handleChange2 =(postId,e)  => {


        this.setState({
            postId:postId, comment: e.target.value
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
        const fullName = this.props.userInfo.firstname + "_" + this.props.userInfo.lastname;
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



        API.deletePost(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.refreshState()
        this.listFriendsPost();

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


        API.changePost(id, {


            content: content

        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.setState({ edit_id: "", editContent: "", editPicture: "" })

        this.refreshState()
        this.listFriendsPost();

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
        this.listFriendsPost();

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
        this.listFriendsPost();


    }


    editCommentClicked = (id, commentID, content, comment, picture) => {

        this.setState({ postComment_id: id, editContent: content, editComment: comment, editPicture: picture, comment_id: commentID, })


    }


    render() {
        const user = this.props.userInfo
        console.log(user)
        console.log(this.props.userInfo)
        console.log(this.state.isNotiOpen)
        console.log(this.props.isNotiOpen)
        let backDrop;
        let editPost;
        let editComment;
        let notificationModal;

        if (this.state.optionId !== "" || this.state.edit_id !== "" || this.state.comOption_id !== "" || this.state.comment_id !== "" || this.props.isNotiOpen===true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }

        if (this.state.edit_id !== "") {

            editPost = <EditPostModal postID={this.state.edit_id} content={this.state.editContent} picture={this.state.editPicture} cancelEdit={this.cancelEdit} changeMessage={this.changeMessage} commentID={this.state.comment_id} />;
        }

        if (this.state.comment_id !== "") {

            editComment = <EditCommentModal postID={this.state.postComment_id} content={this.state.editContent} picture={this.state.editPicture} cancelEditComment={this.cancelEditComment} changeComment={this.changeComment} commentID={this.state.comment_id} comment={this.state.editComment}
            viewNotiPost={this.props.viewNotiPost} />;
        }

        if(this.props.isNotiOpen===true){
           notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.userInfo.user_ID} username={this.props.userInfo.firstname +" "+this.props.userInfo.lastname} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
        }

        return (
            <div className="contentArea ">
                {notificationModal}
                {editPost}
                {backDrop}
                {editComment}
                
                <section className="composeStatus">
                    <textarea name="statusPost" value={this.state.statusPost} onChange={this.handleChange} className="statusText" placeholder="Whats on your mind?" rows="8" cols="80" />
                    <div className="user-I">   <Link to={"/profile/" + this.props.userInfo.user_ID}><img className="user-Img" src={(user.userPic !== undefined && user.userPic !== "" ) ? user.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users_Pic" /> </Link>  </div>
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
                                            {(content.picUrl === "" ) ? <div className="story"> </div> :
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
                                                    <textarea name="comment" value={(content._id=== this.state.postId)?this.state.comment:""}onChange={e => this.handleChange2(content._id, e)} className="commentArea" placeholder="Comment" rows="8" cols="80" />

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
                                                    <div className="replyButton" onClick={this.state.comment === "" && this.state.url === "" ? null : () => this.submitComment(content._id,content.user_ID)} ><i className="fas fa-share"></i> </div>

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

        );
    }



}



export default Content;