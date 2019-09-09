import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";
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








 

    render() {
        const user = this.props.userInfo
        console.log(this.props)
       

        return (
            <div className="contentArea ">

                <div className="friendsHeader"><h1>Your Friends</h1></div>
                <section className="feed ">

                    {this.state.allUsersFriends.length ? (

                        <div className="friendsList">
                            {this.state.allUsersFriends.map(content => {
                               console.log(content)
                                return (
                                   

                                    <div className="friends"  key={content._id} >
                                      
                                      <a className="friend" href="#"><img className="friend" src= {content.userPic} />  </a>
                                      
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



export default ScrFriends;