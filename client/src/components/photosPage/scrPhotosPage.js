import React from "react";
import API from "../../utils/API"
import VideoPost from "../videoPost/VideoPost"
import NotificationModal from "../modal/NotificationModal";
import BackDrop from "../sideDrawer/backDrop/backDrop";
class ScrPhotosPage extends React.Component {
    state = {
        screenName: "",
        allUsersPhotos: [],
        isNotiOpen: false,


    }
    componentDidMount() {





        API.getScreenNameInfo({ _id: this.props.userInfo.match.params.id })

            .then(res => {


                console.log(res)
                this.setState({ allUsersPhotos: res.data.photos, screenName: res.data.screenName })

            })

            .catch(err => console.log(err));



    }




    showPhotos = () => {

        API.getPhotos2({ _id: this.props.userInfo.match.params.id })

            .then(res => {
                console.log(res)
                this.setState({ allUsersPhotos: res.data.photos, screenName: res.data.screenName })



            })

            .catch(err => console.log(err));

    }





    backdropClicked = () => {


        this.props.notiClose()
    }





    render() {


        console.log(this.props.userInfo.match.params.id)

        let backDrop;
        let notificationModal;

        if (this.props.isNotiOpen === true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }



        if (this.props.isNotiOpen === true) {
            notificationModal= <NotificationModal  userInfo={this.props.userInfo} notiPost={this.props.notiPost} user_id={this.props.screenInfo._id} username={this.props.screenInfo.screenName} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
        }



        return (
            <div className="contentArea ">

                {backDrop}

                {notificationModal}

                <div className="friendsHeader"><h1> {this.state.screenName}'s Photos</h1></div>
                <section className="feed ">

                    {this.state.allUsersPhotos.length ? (

                        <div className="friendsList">
                            {this.state.allUsersPhotos.map(photo => {
                                console.log(photo)
                                return (


                                    <div className="friends" key={photo} >

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



export default ScrPhotosPage;