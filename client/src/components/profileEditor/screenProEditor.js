import React from "react";
import API from "../../utils/API";

import { storage } from "../../config/firebase";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import NotificationModal from "../modal/NotificationModal";

class ScreenProEditor extends React.Component {
    state = {

        image: null,
        url: "",
        isActive: false,
        screenName: "",
        birthDate: "",
        gender: "",
        cityState: "",
        userPic: "",
        relationship: "",
        isNotiOpen: false,

    }






    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };




    updateProfile = id => {









        let profileEdit = {

           
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            cityState: this.state.cityState,
            userPic: this.state.url,
            relationship: this.state.relationship
        }

        for (let x in profileEdit) {
            if (profileEdit[x] === "") {
                delete profileEdit[x];
            }
        }


        console.log(profileEdit)


        API.updateEditProfile(this.props.userInfo.user_ID, {

            profileEdit

        })
            .then(function (response) {
                console.log(response);


            })
            .catch(err => console.log(err));





            API.updateEditScreenProfile(id, {

                profileEdit
    
            })
                .then(function (response) {
                    console.log(response);

                    this.props.screenNameData()
    
    
                })
                .catch(err => console.log(err));



        this.setState({
            screenName: "",
            birthDate: "",
            gender: "",
            cityState: "",
            userPic: "",
            relationship: "",
            isActive: false
        })


        
    }






    handleImageSelected = event => {
        this.uploadClick()
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
        }



    }


    handleUpload = () => {
        const fullName = this.props.screenInfo._id + " "+this.props.screenInfo.screenName
        const { image } = this.state;
        const uploadTask = storage.ref(fullName + "/" + image.name).put(image);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress: progress })
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref(fullName).child(image.name).getDownloadURL()
                    .then(url => {
                        this.setState({ url: url });
                        console.log(url)
                    })
            });
    }

    uploadClick = () => {

        this.setState({ isActive: true })
    };


    backdropClicked = () => {


        this.props.notiClose()

    }







    render() {
        const fullName = this.props.screenInfo.screenName
      

        let backDrop;
        let notificationModal;


        if (this.props.isNotiOpen === true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }

        if (this.props.isNotiOpen === true) {
            notificationModal = <NotificationModal userInfo={this.props.screenInfo} notiPost={this.props.notiPost} user_id={this.props.screenInfo._id} username={this.props.screenInfo.screenName} saveNotification={this.props.saveNotification} notiClose={this.props.notiClose} />
        }

        return (

            <div className="contentArea scPage ">

                {notificationModal}
                {backDrop}

                <div className="profile-container">
                    <div className="profile-image">
                        <img src={(this.state.userPic !== "") ? this.state.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users pic" />
                    </div>
                    <div className="profile-info">
                        {fullName.toUpperCase()}
                    </div>

                    <section className="editProfile">
                        <div className="unchangeable">Name:  {this.props.screenInfo.screenName.toUpperCase()} </div>
                        <div className="unchangeable">Email: {this.props.userInfo.emailaddress}</div>

                        <div className="profileInputs">
                            <input value={this.state.screenName} onChange={this.handleChange} placeholder="Screen name" name="screenName" className="editInput" />
                        </div>
                        <div className="profileInputs">
                            <input value={this.state.birthDate} onChange={this.handleChange} type="text" placeholder="Birth date" name="birthDate" className="editInput" />
                        </div>
                        <div className="profileInputs">
                            <input value={this.state.Gender} onChange={this.handleChange} type="text" placeholder="Gender" name="gender" className=" editInput" />
                        </div>

                        <div className="profileInputs">
                            <input value={this.state.cityState} onChange={this.handleChange} type="text" placeholder="city/state" name="cityState" className=" editInput" />
                        </div>
                        <div className="profileInputs">Are you in a relationship?
                                <input value={this.state.relationship} onChange={this.handleChange} type="text" placeholder="Relationship Status" name="relationship" className=" editInput" />
                        </div>

                    </section>

                    <section className="feed ">
                        <div className="avatar">
                            <div className="avatarsect">
                                Upload Screen Name Avatar
                        </div>
                            <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
                            <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="previewupload" height="40" width="50" />

                            <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                            <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                            <span className={this.state.isActive ? "uploadReady active" : "uploadReady"}></span>
                            <button type="button" className="button photo" onClick={() => this.fileInput.click()}><i class="fas fa-camera-retro"></i></button>


                        </div>
                        <br></br>
                        <br></br>
                        <div className="btnDiv">
                            <button onClick={() => this.updateProfile(this.props.screenInfo._id)} className="updateProfileBtn"> Update Profile</button>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </section>


                </div>

            </div>
        );
    }



}



export default ScreenProEditor;