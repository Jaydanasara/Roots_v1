import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";

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
        
       

        return (
            <div className="contentArea ">

                <div className="friendsHeader"><h1>{this.props.screenInfo.screenName }'s Friends</h1></div>
                <section className="feed ">

                    {this.state.allUsersFriends.length ? (

                        <div className="friendsList">
                            {this.state.allUsersFriends.map(content => {
                               console.log(content)
                                return (
                                   

                                    <div className="friends"  key={content._id} >
                                      
                                      <a className="friend" href="#"><img className="friend" src= {content.userPic} alt="friends pic"/>  </a>
                                      
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