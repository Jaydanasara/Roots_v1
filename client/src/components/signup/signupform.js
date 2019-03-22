import React from "react";
import Fire from "../../config/fire";
import "../../components/layouts/roots.css";
class SignupForm extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        password: "",
        email:""
      }

    //   login = event => {
    //      event.preventDefault();
    //     Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    //     .then((u)=>{
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    //     // if (!this.state.firstName || !this.state.lastName) {
    //     //   alert("Fill out your first and last name please!");
    //     // } else if (this.state.password.length < 6) {
    //     //   alert(
    //     //     `Choose a more secure password ${this.state.firstName} ${this.state
    //     //       .lastName}`
    //     //   );
    //     // } else {
    //     //   alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    //     }

        // handleInputChange = event => {
        //     // Getting the value and name of the input which triggered the change
        //    this.setState({ [event.target.value]:event.target.name});
           
        // }
        handleChange = e => {
    

            this.setState({
              [e.target.name]: e.target.value
            });
          };
        


        newSignup = e => {
            e.preventDefault();
           Fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
           .catch((error)=>{
               console.log(error);
           })
        }

    render() {
        return (
            <div className="row">
                <div className="signup">
                    <h1> Signup</h1>
                    <p className="text-muted">Like The Branches of a tree we are Connected
                    </p>
                </div>
                <form>
                    <div className="col-sm-9">
                    <div className= "row">
                    <div className="col-sm-6 form-group">
                    <input value={this.state.firstName} onChange={this.handleChange} type="text" placeholder= "First Name" name="firstName" ref="firstName" className="form-control"/>
                        </div>
                        <div className="col-sm-6 form-group">
                        <input value={this.state.lastName} onChange={this.handleChange} type="text" placeholder= "Last Name" name="lastName" ref="lastName" className="form-control"/>
                        </div>
                    </div>
                       
                    
                    <div className="form-group" >
                    <input value={this.state.email} onChange={this.handleChange} type="email" placeholder= "Email Adress" name="email" ref="email" className="form-control"/>
                    </div>
                    <div className="form-group" >
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder= "Password" name="password" ref="password" className="form-control"/>
                    </div> 
                    <button onClick={this.newSignup} type = "submit" className = "btn btn-md btn-success"> Sign up</button>
                    </div>
                </form>

            </div >
        )
    }
};

export default SignupForm;