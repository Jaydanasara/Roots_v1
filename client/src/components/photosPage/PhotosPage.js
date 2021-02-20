import React from "react";
import API from "../../utils/API";
import VideoPost from "../videoPost/VideoPost"
import BackDrop from "../sideDrawer/backDrop/backDrop";
import NotificationModal from "../modal/NotificationModal";
class PhotosPage extends React.Component {
    state = {
        fullName: "",
        allUsersPhotos: [],
        isNotiOpen: false,


    }
    componentDidMount() {

        this.showPhotos()

    }




    showPhotos = () => {

        API.getPhotos({ _id: this.props.userInfo.match.params.id })

            .then(res => {

                this.setState({ allUsersPhotos: res.data.photos, fullName: res.data.firstname + " " + res.data.lastname })
                console.log(res.data.photos)


            })

            .catch(err => console.log(err));

    }



    backdropClicked = () => {


        this.props.notiClose()

    }






    render() {
      

        let backDrop;
        let notificationModal;

        if (this.props.isNotiOpen === true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }

        if (this.props.isNotiOpen === true) {
            notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.userInfo.user_ID} username={this.props.userInfo.firstname +" "+this.props.userInfo.lastname} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
        }


        return (
            <div className="contentArea ">

                {notificationModal}
                {backDrop}

                <div className="friendsHeader"><h1> {this.state.fullName}'s Photos</h1></div>
                <section className="feed ">

                    {this.state.allUsersPhotos.length ? (

                        <div className="friendsList">
                            {this.state.allUsersPhotos.map((photo,index) => {
                                console.log(photo)
                                return (


                                    <div className="friends" key={index} >
                                        {
                                            (photo.substring(photo.lastIndexOf(".") + 1, photo.lastIndexOf(".") + 4) === "mp4" || photo.substring(photo.lastIndexOf(".") + 1, photo.lastIndexOf(".") + 4) === "mpg"
                                                || photo.substring(photo.lastIndexOf(".") + 1, photo.lastIndexOf(".") + 4) === "wmv" || photo.substring(photo.lastIndexOf(".") + 1, photo.lastIndexOf(".") + 4) === "mpeg") ?

                                                <div className="uploadedVideo"> <VideoPost video={photo} /></div> :

                                                <a className="friend" href="#"><img className="friend" src={photo} alt="friends snapshot" />  </a>

                                        }


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