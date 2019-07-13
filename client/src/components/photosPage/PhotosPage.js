import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";
class PhotosPage extends React.Component {
    state = {
       fullName:"",
        allUsersPhotos: [],
       


    }
    componentDidMount() {
        
        this.showPhotos()

    }

   


    showPhotos = () => {

        API.getPhotos({_id: this.props.userInfo.match.params.id })

            .then(res => {
                
                this.setState({ allUsersPhotos: res.data.photos,fullName:res.data.firstname+" "+ res.data.lastname })
                 console.log(res.data.photos)


            })

            .catch(err => console.log(err));

    }








 

    render() {
       console.log ( this.props.userInfo.match.params.id )

        return (
            <div className="contentArea ">

                <div className="friendsHeader"><h1> {this.state.fullName}'s Photos</h1></div>
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



export default PhotosPage;