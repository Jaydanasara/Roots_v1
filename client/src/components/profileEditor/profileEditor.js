import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";

class ProfileEditor extends React.Component {
    state = {

        image: null,
        url: "",
        isActive: false,

        emailaddress: "",
        password: "",
        confirm: "",
        screenName: "",
        securityQuestion: "",
        securityAnswer: "",
        birthDate: "",
        gender: "",
        phoneNumber: "",
        cityState: "",
        userPic: "",

    }


    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };



    updateProfile = id => {






        if (this.state.password.length > 0 && this.state.password.length < 6) {
            alert(
                `Choose a more secure password `
            );
        } else if (this.state.password !== this.state.confirm) {
            alert("You Passwords do not match");
        } else {






            API.updateEditProfile(id, {


                password: this.state.password,
                screenName: this.state.screenName,
                securityQuestion: this.state.securityQuestion,
                securityAnswer: this.state.securityAnswer,
                birthDate: this.state.birthDate,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                cityState: this.state.cityState,
                userPic: this.state.url
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(err => console.log(err));

                document.getElementById("profileForm").reset();
        }
        

    }







    handleImageSelected = event => {
        this.uploadClick()
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
        }



    }


    handleUpload = () => {
        const fullName = this.props.userInfo.firstname + "_" + this.props.userInfo.lastname;
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

        this.setState({ isActive: !this.state.isActive })
    };










    render() {
        const fullName = this.props.userInfo.firstname + " " + this.props.userInfo.lastname
        const user = this.props.userInfo
        console.log(this.props.userInfo.userPic)
        return (

            <div className="contentArea ">
                <div className="profile-container">
                    <div className="profile-image">
                        <img src={this.props.userInfo.userPic} />
                    </div>
                    <div className="profile-info">
                        {fullName}
                    </div>

                    <section className="editProfile">
                        <div className="unchangeable">Name:  {fullName} </div>
                        <div className="unchangeable">Email: {this.props.userInfo.emailaddress}</div>
                        <form id="profileForm">
                            <div className="profileInputs">
                                <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password" ref="password" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.confirm} onChange={this.handleChange} type="password" placeholder="confirm password" name="confirm" ref="confirmPassword" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.securityQuestion} onChange={this.handleChange} type="text" placeholder="security question" name="securityQuestion" ref="securityQuestion" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.securityAnswer} onChange={this.handleChange} type="text" placeholder="Answer to security question" name="securityAnswer" ref="securityAnswer" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.screenName} onChange={this.handleChange} placeholder="screen name" name="screenName" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.birthDate} onChange={this.handleChange} type="text" placeholder="birth date" name="birthDate" className="editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.Gender} onChange={this.handleChange} type="text" placeholder="gender" name="gender" className=" editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.phoneNumber} onChange={this.handleChange} type="text" placeholder="phone number" name="phoneNumber" className=" editInput" />
                            </div>
                            <div className="profileInputs">
                                <input value={this.state.cityState} onChange={this.handleChange} type="text" placeholder="city/state" name="cityState" className=" editInput" />
                            </div>
                            <div className="profileInputs"> Are you in a Relationship?
                    <input value={this.state.Gender} onChange={this.handleChange} type="text" placeholder="" name="gender" className=" editInput" />
                            </div>
                        </form>
                    </section>

                    <section className="feed ">
                        <div className="avatar">
                            <div className="avatarsect">
                                Upload Avatar
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
                            <button onClick={() => this.updateProfile(this.props.userInfo.user_ID)} className="updateProfileBtn"> Update Profile</button>
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



export default ProfileEditor;