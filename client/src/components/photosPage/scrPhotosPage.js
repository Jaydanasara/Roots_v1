import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";
class ScrPhotosPage extends React.Component {
    state = {
       screenName:"",
        allUsersPhotos: [],
       


    }
    componentDidMount() {
        
        this.showPhotos()

    }

   


    showPhotos = () => {

        API.getPhotos2({_id: this.props.userInfo.match.params.id })

            .then(res => {
                
                this.setState({ allUsersPhotos: res.data.photos,screenName:res.data.screenName})
                 console.log(res.data.photos)


            })

            .catch(err => console.log(err));

    }








 

    render() {
       console.log ( this.props.userInfo.match.params.id )

        return (
            <div className="contentArea ">

                <div className="friendsHeader"><h1> {this.state.screenName}'s Photos</h1></div>
                <section className="feed ">

                    {this.state.allUsersPhotos.length ? (

                        <div className="friendsList">
                            {this.state.allUsersPhotos.map(photo => {
                               console.log(photo)
                                return (
                                   

                                    <div className="friends"  key={photo} >
                                      
                                      <a className="friend" href="#"><img className="friend" src= {photo} />  </a>
                                      
                                      

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



export default ScrPhotosPage;