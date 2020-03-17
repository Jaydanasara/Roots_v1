import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";
import moment from "moment";
class ProfileContent extends React.Component {
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
        isActive: false,

    }
    componentDidMount() {
        this.listPost()
        console.log(this.props.userInfo.match.params.id)
    }


    listPost = () => {

        API.getUsersPost({ _id: this.props.userInfo.match.params.id })

            .then(res => {
                this.setState({ allUserPost: res.data.post, first_Name: res.data.firstname, last_Name: res.data.lastname, userPic: res.data.userPic })
                console.log(res)


            })

            .catch(err => console.log(err));
        console.log("listpost complete")

    }





    submitPost = () => {
        API.savePost({
            content: this.state.statusPost,
            post_by: this.props.userInfo.userInfo.firstname + this.props.userInfo.userInfo.lastname,
            post_by_pic: this.props.userInfo.userInfo.userPic,
            user_ID: this.props.userInfo.userInfo.user_ID,
            picUrl: this.state.url,
        })
            .then(console.log(this.submitPost))
            .then(res => {


                this.setState({ postID: res.data._id }, () => this.addPostID());
                console.log(res)
                this.listPost()
            })

            .catch(err => console.log(err));


        this.setState({ statusPost: "" });
        console.log("after list post")
    }


    addPostID = () => {


        API.postID({
            _id: this.props.userInfo.userInfo.user_ID,
            post: this.state.postID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));



    }


    submitComment = (id) => {
        API.saveComment(id, {

            comment: this.state.comment,
            user_id: this.props.userInfo.userInfo.user_ID,
            user: this.props.userInfo.userInfo.firstname + " " + this.props.userInfo.userInfo.lastname,
            picUrl: this.state.url,
        })
            .then(res => {

                console.log(res)
                this.listPost()
            })
            .catch(err => console.log(err));

        this.setState({ comment: "" });
    }

    handleLikes = (id) => {

        console.log("working")

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

        console.log("working")

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


    handleImageSelected = event => {
        this.uploadClick()
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
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
                        this.setState({ url: url }, () => this.addToPhotos());
                        console.log(url)
                    })
            });
    }

    uploadClick = () => {

        this.setState({ isActive: !this.state.isActive })
    };

    addToPhotos = () => {

        API.addPhotos({
            photos: this.state.url,
            id: this.props.userInfo.userInfo.user_ID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));
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

    }

    addfriendID = () => {


        API.friendID({
            _id: this.props.userInfo.userInfo.user_ID,
            friends: this.props.userInfo.match.params.id,
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));



    }








    render() {
        const fullName = this.state.first_Name + " " + this.state.last_Name

        console.log(this.props.userInfo.userInfo.firstname + " " + this.props.userInfo.userInfo.lastname)
        return (

            <div className="contentArea ">
                <div className="profile-container">
                    <div className="profile-image">
                        <img src={this.state.userPic} alt="users pic" />
                    </div>
                    <div className="profile-info">
                        {fullName}
                    </div>
                    <div className="button-div">
                        <div className="follow-button" style={this.props.userInfo.match.params.id === this.props.userInfo.userInfo.user_ID ? { display: "visible" } : { display: "none" }}  > <Link to={"/editprofile/" + this.props.userInfo.userInfo.user_ID}>edit profile</Link>     </div>
                        <button className="friend-btn" onClick={this.addingFriend}>{(this.state.addFriend) ? <i id="friend-icon" class="fa fa-users fa-2x " aria-hidden="true" >+</i> : "UnFriend"}</button>
                        <button className="photos-btn" ><Link to={"/photos/" + this.props.userInfo.match.params.id}>Photos </Link> </button>
                        <button className="my-friends" ><a href="/friends">MyFriends</a> </button>
                    </div>
                </div>
                <section className="composeStatus">
                    <textarea name="statusPost" value={this.state.statusPost} onChange={this.handleChange} className="statusText" placeholder="Whats on your mind?" rows="8" cols="80" />
                    <div className="user-I">  <Link to={"/profile/" + this.props.userInfo.userInfo.user_ID}><img className="user-Img" src={this.state.userPic} alt="users pic" /> </Link>  </div>
                    <div className="buttons">
                    <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
                        <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="previewupload" height="40" width="50" />

                        <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                        <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                        <span className={this.state.isActive ? "uploadReady active" : "uploadReady"}>no file chosen yet </span>
                        <button type="button" className="button photo" onClick={() => this.fileInput.click()}><i class="fas fa-camera-retro"></i></button>


                        <div className="button video"><i class="fas fa-video"></i></div>
                        <div className="button send">
                            <button type="submit" className="postbutton" onClick={this.submitPost}>Post </button>
                        </div>
                    </div>
                </section>

                <section className="feed ">

                    {this.state.allUserPost.length ? (

                        <div>
                            {this.state.allUserPost.map(each => {
                                return (


                                    <div className="feed_Container">
                                        <div className="friendsPostinfo">
                                            <a className="friends-I" href="/profile"><img className="friendsImg" src={each.post_by_pic} alt="friendspic" />  </a>
                                            <div className="friendsInfo"> <a href="/profile" className="friendInfoLink">{each.post_by}</a>shared a &nbsp;
                                            <a href="/profile">{(each.picUrl === undefined) ? "story" : "image"}</a>  </div>
                                        </div>
                                        <div className="uploadedInfo">
                                            <div className={`${(each.picUrl === undefined) ? "story" : "upImage"}`}><img className={`${(each.picUrl === undefined) ? "story" : "upImage"}`} src={each.picUrl} alt="uploadedpic" /></div>
                                        </div>
                                        <div className="colorBackground">
                                            <div className="updateInfo">
                                                <div>{moment(each.dateCreated).calendar()}</div>
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
                                                each.comments.map((comment,picUrl) =>
                                                    <div key={picUrl}className="commentList">{moment(comment.dateCreated).calendar()} <span> &nbsp; <strong>{comment.user} </strong>  &nbsp; </span>   {comment.comment}
                                            <div className={comment.picUrl ===""?"commentPic":"nocommentPic"}><img className="commentUrl" src={comment.picUrl}/></div></div>
                                                )}
                                                <div className="responseComments">
                                                    <textarea name="comment" value={this.state.comment} onChange={this.handleChange} className="commentArea" placeholder="Comment" rows="8" cols="80" />
                                                    <div>
                                                    <button type="button" className="button photo" onClick={() => this.fileInput.click()}> <i class="far fa-images"></i></button>
                                                    <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
                        <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="previewupload" height="40" width="50" />

                        <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                        <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                        <span className={this.state.isActive ? "uploadReady active" : "uploadReady"}>no file chosen yet </span>
                      
                                                   
                                                   
                                          </div>
                                                </div>
                                                <div className="commentButtons">
                                                    <div className="replyButton" onClick={() => this.submitComment(each._id)} ><i class="fas fa-share"></i> </div>

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



export default ProfileContent;