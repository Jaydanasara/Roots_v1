import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class ProfileContent extends React.Component {
    state = {
        postID: "",
        statusPost: "",
        allUserPost: [],
        first_Name:"",
       last_Name:"",
       addFriend:true,
       userPic:""

    }
    componentDidMount() {
        this.listPost()
        console.log(this.props.userInfo.match.params.id)
    }


    listPost = () => {

        API.getUsersPost({ _id: this.props.userInfo.match.params.id })

            .then(res => {
                this.setState({ allUserPost: res.data.post,first_Name:res.data.firstname, last_Name:res.data.lastname ,userPic:res.data.userPic })
                console.log(res)


            })

            .catch(err => console.log(err));

    }



    submitPost = () => {
        API.savePost({
            content: this.state.statusPost,
            post_by: this.props.userInfo.userInfo.firstname + this.props.userInfo.userInfo.lastname,
            post_by_pic:this.props.userInfo.userInfo.userPic
        })
            .then(console.log(this.submitPost))
            .then(res => {


                this.setState({ postID: res.data._id }, () => this.addPostID());
                console.log(this.state)
            })

            .catch(err => console.log(err));

    }


    addPostID = () => {


        API.postID({
            _id: this.props.userInfo.userInfo.user_ID,
            post: this.state.postID
        })

            .then(res => console.log(res))
            .catch(err => console.log(err));



    }




    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };

addingFriend=()=>{
this.setState ({addFriend: !this.state.addFriend})



    API.saveFriend({
        friendName:  this.state.first_Name +" "+ this.state.last_Name,
        Friend_id:this.props.userInfo.match.params.id,
        addFriend:false,
        friendPic:this.state.userPic
       
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
        const fullName= this.state.first_Name +" "+ this.state.last_Name
        const user = this.props.userInfo
        console.log( this.props.userInfo.userInfo)
        console.log(this.props.userInfo.match)
        return (
            
            <div className="contentArea ">
                <div className="profile-container">
                <div className="profile-image">
                <img src={this.state.userPic} /> 
                </div>
                <div className="profile-info">
                    {fullName}
                </div>
                <div className="button-div"> 
                <div className= "follow-button" style={this.props.userInfo.match.params.id===this.props.userInfo.userInfo.user_ID ? { display: "visible" } : { display: "none" }}  > <Link to={"/editprofile/" + this.props.userInfo.userInfo.user_ID}>edit profile</Link>     </div>
                <button className="friend-btn" onClick={this.addingFriend}>{(this.state.addFriend)?<i id= "friend-icon"class="fa fa-users fa-2x " aria-hidden="true" >+</i>:"UnFriend" }</button>
                <button className="photos-btn" >Photos </button>
                <button className="my-friends" >MyFriends </button>
                </div>
                </div>
                <section className="composeStatus">
                    <textarea name="statusPost" value={this.state.statusPost} onChange={this.handleChange} className="statusText" placeholder="Whats on your mind?" rows="8" cols="80" />
                    <div className="user-I">  <Link to={"/profile/" + this.props.userInfo.userInfo.user_ID}><img className="user-Img" src={user.userPic} /> </Link>  </div>
                    <div className="buttons">
                        <div className="button photo"><i class="fas fa-camera-retro"></i></div>
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
                    <a className="friends-I" href="#"><img className="friendsImg" src={each.post_by_pic} />  </a>
                    <div className="friendsInfo"> <a href="/profile" className="friendInfoLink">{each.post_by}</a>shared a  
                   <a href="#">{(each.picUrl=== undefined)?  "story":"image"}</a>  </div>
                </div>
                <div className="uploadedInfo">
                <div className={`${(each.picUrl === undefined) ? "story" : "upImage"}`}><img className={`${(each.picUrl === undefined) ? "story" : "upImage"}`} src={each.picUrl} /></div>
                </div>
                <div className="colorBackground">
                    <div className="updateInfo">
                        <h3>This is my new site </h3>
                        <p>{each.content}
                             </p>

                    </div>
                    <div className="emojis">
                        <div className="likessection">
                            <div className="likeDisplay"><i class="far fa-thumbs-up"></i> </div>
                        </div>
                        <div className="friendsLiked">Marsh hall and 4 others liked </div>
                        <div className="numOfComments">4 comments </div>
                    </div>
                    <div className="responseComments">
                        <textarea name="comment_Area" className="commentArea" placeholder="Comment" rows="8" cols="80" />
                        <div className="commentButtons">
                            <div className="replyButton"><i class="fas fa-share"></i> </div>
                            <div className="likeButton"><i class="far fa-thumbs-up"></i></div>
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