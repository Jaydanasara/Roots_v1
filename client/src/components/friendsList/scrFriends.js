import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import BackDrop from "../sideDrawer/backDrop/backDrop";

import NotificationModal from "../modal/NotificationModal";
class ScrFriends extends React.Component {
    state = {
       
        allUsersFriends: [],
       


    }
    componentDidMount() {
        
        this.listScreenFriends()

    }

   


    listScreenFriends = () => {

        API.getScreenFriends({ friends: this.props.screenInfo.friends, })

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
            notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.screenInfo._id} username={this.props.screenInfo.screenName} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
         }



        return (
            <div className="contentArea ">


                {backDrop}
                {notificationModal}

                <div className="friendsHeader"><h1>{this.props.screenInfo.screenName }'s Friends</h1></div>
                <section className="feed ">

                    {this.state.allUsersFriends.length ? (

                        <div className="friendsList">
                            {this.state.allUsersFriends.map(content => {
                               console.log(content)
                                return (
                                   

                                    <div className="friends"  key={content._id} >
                                      
                                      <a className="friend" href="#"><img className="friend" src=  {(content.userPic!== undefined && content.userPic !== "") ? content.userPic :  "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="friends pic"/>  </a>
                                      
                                      <div className="friend" > <Link to={"/screenProfile/" + content._id}> {content.screenName} </Link> </div>

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



export default ScrFriends;