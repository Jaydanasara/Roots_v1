import React, {useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import "../../components/layouts/roots.css";
import { connect } from "react-redux";
import  {getUser} from"../../store/actions/userActions";
import {useAuth} from "../../context/AuthContext";


function Header(props) {


    const { login} = useAuth()
const [user,setUser]=useState({
    emailaddress:"",
    password:""
})

const history = useHistory()

    
        

     const   loginInfo =async e => {

            // Preventing the default behavior of the form submit (which is to refresh the page)
    
            e.preventDefault();

            try {
                // setError("")
                // setLoading(true)
                await login(user.emailaddress,user.password)
                await props.getUser(user.emailaddress)
            
                history.push('/')
            } catch (error) {
                alert(error)
    
            }
    
    
           }
           
           

    




    const handleChange = e => {


        setUser({...user,[e.target.name]: e.target.value
        });
    };






    
    
        return (
            <div className="container">
                <div className="header_container">
                    <span className="logoSpan">
                        <img className="sitePic1" src="https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802" alt="tree icon" /><h2 className="siteName">Roots of Our Tree</h2>
                    </span>
                    <div className="memberLogin">
                        <form  id="signin" className="headerBar">
                            <div className="input1">
                                <span className="input-group-addon1">
                                    <i className="fa fa-user-circle" id="loginIcon" aria-hidden="true"></i>
                                </span>
                                <input value={user.emailaddress} onChange={handleChange} type="email" placeholder="Email Address" name="emailaddress"  className="loginInput" />
                            </div>
                            <div className="input1">
                                <span className="input-group-addon1">
                                    <i className="fa fa-key" id="loginIcon" aria-hidden="true"></i>
                                </span>
                                <input value={user.password} onChange={handleChange} type="password" placeholder="Password" name="password"  className="loginInput" />
                            </div>
                            <button type="submit" onClick={loginInfo} className="btn btn-primary">Login</button>
                        </form>

                    </div>

                </div>
                <div className="passmessage2">
                    <Link to="/lostPassword" className="lost">Lost Password</Link>
                    
                </div>
            </div>
        )

};


const mapDispatchToProps = (dispatch) =>{
    return{
        getUser: ( currentUserInfo) => dispatch (getUser(currentUserInfo))
    }
}






const mapStateToProps = (state)=>{
    return{
 userProfile:state.userR.userProfile
    

    }
}

export default  connect(  mapStateToProps, mapDispatchToProps) (Header) 