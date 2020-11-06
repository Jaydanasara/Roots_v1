import React, {useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import {useHistory} from "react-router-dom"
import { connect } from 'react-redux';
import {createUser} from "../../store/actions/userActions";

 function SignupForm(props) {
   
    const { signup} = useAuth()
    // const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [user,setUser]=useState({
        firstname: "",
        lastname: "",
        password: "",
        emailaddress: "",
        screenName:"",
        passwordCfm:"",
        age:""

    })
   


    const handleChange = e => {


        setUser({...user,[e.target.name]: e.target.value
        });
    };


    const newSignup = async  e => {

        e.preventDefault();

        if (!user.firstname || !user.lastname|| !user.screenName) {
            alert("Fill out your first, last name and Screen Name please!");
        } else if (user.password.length < 6) {
            alert(
                `Choose a more secure password ${user.firstname} ${user
                    .lastname}`
            );
        } else if (user.password !== user.passwordCfm) {
            alert("You Passwords do not match");
        }else if (user.age<18 || user.age.length===0){
            alert("You must be 18 or older to join this site");
        }else if(isNaN(user.age)){
            alert("You must enter a number")
        }
        else {

            
        try {
            // setError("")
            // setLoading(true)
            await signup(user.emailaddress, user.password)
            await props.createUser(user)
            history.push('/')
        } catch (error) {
            alert(error)
           

        }
    
      
                

         



        }



    }




    return (
        <div className="register">
        <div className="signup">
            <h1> Register</h1>
            <p className="text-muted">Like The Branches of a tree we are Connected
            </p>
        </div>
        <form className="signUpForm">
            <div className="signupContainer">
                <div className="registerName">
                    <div className="col-sm-6 form-group">
                        <input value={user.firstname} onChange={handleChange} type="text" placeholder="First Name" name="firstname" className="signupInput" />
                    </div>
                    <div className="col-sm-6 form-group">
                        <input value={user.lastname} onChange={handleChange} type="text" placeholder="Last Name" name="lastname"  className="signupInput" />
                    </div>
                    <div className="form-group">
                        <input value={user.age} onChange={handleChange} type="text" placeholder="Age" name="age"  className="signupInput" />
                    </div>
                    <div className="col-sm-6 form-group">
                        <input value={user.screenName} onChange={handleChange} type="text" placeholder="Screen Name" name="screenName"  className="signupInput" />
                    </div>
                </div>


                <div className="registerEmail" >

                    <input value={user.emailaddress} onChange={handleChange} type="email" placeholder="Email Address" name="emailaddress"  className="signupInput" />

                    <div className="" >
                        <input value={user.password} onChange={handleChange} type="password" placeholder="Password" name="password"  className="signupInput" />
                        <input value={user.passwordCfm} onChange={handleChange} type="password" placeholder="Confirm Password" name="passwordCfm"  className="signupInput" />
                    </div>

                </div>

                <div className="passmessage"><p>Password must be at least 6 characters</p></div>
                <div className="signupButContainer">
                <button onClick={newSignup} type="submit" className="signupBtn"> Sign up</button>
                </div>


            </div>
        </form>

    </div >
    )
}
const mapDispatchToProps = (dispatch) =>{
    return{
        createUser: ( newUserInfo) => dispatch (createUser(newUserInfo))
    }
}


export default connect( null, mapDispatchToProps ) (SignupForm);