import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import NotificationModal from "../modal/NotificationModal";
import BackDrop from "../sideDrawer/backDrop/backDrop";




class FriendsList extends React.Component {
    state = {
       
        allUsersFriends: [],
        isNotiOpen:false,


    }
    componentDidMount() {
        
        this.listUsersFriends()

    }

   


    listUsersFriends = () => {

        console.log(this.props.userInfo.friends)
        
        console.log(this.props.friendsinfo)
        API.getFriendsList({ friends: this.props.friendsinfo })

            .then(res => {
                
                this.setState({ allUsersFriends: res.data })
                 console.log(res.data)


            })

            .catch(err => console.log(err));

    }





    backdropClicked = () => {

       
        this.props.notiClose()

    }


    
 

    render() {

        let backDrop;
       let notificationModal;
      
        if ( this.props.isNotiOpen===true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }
        
        if(this.props.isNotiOpen===true){
            notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.userInfo.user_ID} username={this.props.userInfo.firstname +" "+this.props.userInfo.lastname} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
         }

        return (


            <div className="contentArea ">
                 {notificationModal}
            {backDrop}

                <div className="friendsHeader"><h1>{this.props.firstName}'s Friends</h1></div>
                <section className="feed ">

                    {this.state.allUsersFriends.length ? (

                        <div className="friendsList">
                            {this.state.allUsersFriends.map(content => {
                               console.log(content)
                                return (
                                   

                                    <div className="friends"  key={content._id} >
                                       
                                      
                                      <div className="friend"><Link to={"/profile/" + content._id}><img className="friend" src=  {(content.userPic!== undefined && content.userPic !== "") ? content.userPic :  "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt= "users pic" /></Link>  </div>
                                      
                                      <div className="friend" > <Link to={"/profile/" + content._id}> {content.firstname} {" "} {content.lastname} </Link> </div>

                                    </div>

                                );
                            })
                            }
                        </div>

                    ) : (
                            <h1>No recent Friends to display</h1>
                        )}



                </section>


            </div>

        );
    }



}



export default FriendsList;