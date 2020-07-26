import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";

class FriendsList extends React.Component {
    state = {
       
        allUsersFriends: [],
       


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








 

    render() {
      
       

        return (
            <div className="contentArea ">

                <div className="friendsHeader"><h1>{this.props.firstName}'s Friends</h1></div>
                <section className="feed ">

                    {this.state.allUsersFriends.length ? (

                        <div className="friendsList">
                            {this.state.allUsersFriends.map(content => {
                               console.log(content)
                                return (
                                   

                                    <div className="friends"  key={content._id} >
                                      
                                      <div className="friend"><Link to={"/profile/" + content._id}><img className="friend" src= {content.userPic} alt= "users pic" /></Link>  </div>
                                      
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