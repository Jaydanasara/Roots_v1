import React from "react";
import Fire from "../../config/fire";
// import "../../components/layouts/roots.css";
class SignupForm extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        password: "",
        email:""
      }

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
            <div className="register">
                <div className="signup">
                    <h1> Register</h1>
                    <p className="text-muted">Like The Branches of a tree we are Connected
                    </p>
                </div>
                <form>
                    <div className="col-sm-9">
                    <div className= "registerName">
                    <div className="col-sm-6 form-group">
                    <input value={this.state.firstName} onChange={this.handleChange} type="text" placeholder= "First Name" name="firstName" ref="firstName" className="signupInput"/>
                        </div>
                        <div className="col-sm-6 form-group">
                        <input value={this.state.lastName} onChange={this.handleChange} type="text" placeholder= "Last Name" name="lastName" ref="lastName" className="signupInput"/>
                        </div>
                    </div>
                       
                    
                    <div className="registerEmail" >
                    
                    <input value={this.state.email} onChange={this.handleChange} type="email" placeholder= "Email Adress" name="email" ref="email" className="signupInput"/>
                   
                    <div className="" >
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder= "Password" name="password" ref="password" className="signupInput"/>
                    </div> 
                    </div>
                    <button onClick={this.newSignup} type = "submit" className = "signupBtn"> Sign up</button>
                    
                   
                    </div>
                </form>

            </div >
        )
    }
};

export default SignupForm;