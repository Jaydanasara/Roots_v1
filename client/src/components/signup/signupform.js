import React from "react";
import Fire from "../../config/fire";

import { connect } from 'react-redux';
import {createUser} from "../../store/actions/userActions";
// import "../../components/layouts/roots.css";
class SignupForm extends React.Component {



    state = {
        firstname: "",
        lastname: "",
        password: "",
        emailaddress: "",
        screenName:"",
        name:""

    }




    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };



    newSignup = e => {

        e.preventDefault();

        
        // const newUserInfo ={
        //     firstname: this.state.firstName,
        //         lastname: this.state.lastName,
        //         emailaddress: this.state.email,
        //         password: this.state.password,
        //         screenName:this.state.screenName
        // }



        if (!this.state.firstname || !this.state.lastname|| !this.state.screenName) {
            alert("Fill out your first, last name and Screen Name please!");
        } else if (this.state.password.length < 6) {
            alert(
                `Choose a more secure password ${this.state.firstname} ${this.state
                    .lastname}`
            );
        } else if (this.state.password !== this.state.name) {
            alert("You Passwords do not match");
        }
        else {

            Fire.auth().createUserWithEmailAndPassword(this.state.emailaddress, this.state.password)
            .catch(err => alert(err));
            this.props.createUser(this.state)
                

            // API.saveName({

           
            //     firstname: this.state.firstName,
            //     lastname: this.state.lastName,
            //     emailaddress: this.state.email,
            //     password: this.state.password,
            //     screenName:this.state.screenName
                

            // })
            //     .then(function (response) {
            //         console.log(response);
            //       })
            //     .catch(err => console.log(err));



        }



    }

    render() {
        return (
            <div className="register">
                <div className="signup">
                    <h1> Register</h1>
                    <p className="text-muted">Like The Branches of a tree we are Connected
                    </p>
                </div>
                <form>
                    <div className="col-sm-9">
                        <div className="registerName">
                            <div className="col-sm-6 form-group">
                                <input value={this.state.firstname} onChange={this.handleChange} type="text" placeholder="First Name" name="firstname" ref="firstName" className="signupInput" />
                            </div>
                            <div className="col-sm-6 form-group">
                                <input value={this.state.lastname} onChange={this.handleChange} type="text" placeholder="Last Name" name="lastname" ref="lastName" className="signupInput" />
                            </div>
                            <div className="col-sm-6 form-group">
                                <input value={this.state.screenName} onChange={this.handleChange} type="text" placeholder="Screen Name" name="screenName" ref="screenName" className="signupInput" />
                            </div>
                        </div>


                        <div className="registerEmail" >

                            <input value={this.state.emailaddress} onChange={this.handleChange} type="email" placeholder="Email Address" name="emailaddress" ref="email" className="signupInput" />

                            <div className="" >
                                <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password" ref="password" className="signupInput" />
                                <input value={this.state.name} onChange={this.handleChange} type="password" placeholder="Confirm Password" name="name" ref="confirm" className="signupInput" />
                            </div>

                        </div>

                        <div className="passmessage"><p>Password must be at least 6 characters</p></div>
                        <button onClick={this.newSignup} type="submit" className="signupBtn"> Sign up</button>


                    </div>
                </form>

            </div >
        )
    }
};



const mapDispatchToProps = (dispatch) =>{
    return{
        createUser: ( newUserInfo) => dispatch (createUser(newUserInfo))
    }
}


export default connect( null, mapDispatchToProps ) (SignupForm);