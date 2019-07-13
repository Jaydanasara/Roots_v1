import React from "react";
import Fire from "../../config/fire";
import "../../components/layouts/roots.css";
import { connect } from "react-redux";
import  {getUser} from"../../store/actions/userActions"


class Header extends React.Component {
  state={
      emailaddress:"",
      password:""
  }
// componentDidMount()





    
        

        login = e => {

            // Preventing the default behavior of the form submit (which is to refresh the page)
    
            e.preventDefault();
            
            Fire.auth().signInWithEmailAndPassword(this.state.emailaddress,this.state.password)
         .catch(err => alert(err));
    
         this.props.getUser(this.state)
    
    
    
           }
           
           

    




    handleChange = e => {


        this.setState({
            [e.target.name]: e.target.value
        });
    };






    render() {
        
        
        return (
            <div className="container">
                <div className="header_container">
                    <span className="logoSpan">
                        <img className="sitePic1" src="./treeicon.png" alt="tree icon" /><h2 className="siteName">Roots of a Tree</h2>
                    </span>
                    <div className="memberLogin">
                        <form  id="signin" className="headerBar">
                            <div className="input1">
                                <span className="input-group-addon1">
                                    <i className="fa fa-user-circle" id="loginIcon" aria-hidden="true"></i>
                                </span>
                                <input value={this.state.emailaddress} onChange={this.handleChange} type="email" placeholder="Email Address" name="emailaddress" ref="email" className="loginInput" />
                            </div>
                            <div className="input1">
                                <span className="input-group-addon1">
                                    <i className="fa fa-key" id="loginIcon" aria-hidden="true"></i>
                                </span>
                                <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password" ref="password" className="loginInput" />
                            </div>
                            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                        </form>

                    </div>

                </div>
                <div className="passmessage2">
                    <a href="/lostPassword" className="lost">Lost Password</a>
                    
                </div>
            </div>
        )
    }
};
// Header.propTypes={
//     getPost:PropTypes.func.isRequired,

// }

const mapDispatchToProps = (dispatch) =>{
    return{
        getUser: ( currentUserInfo) => dispatch (getUser(currentUserInfo))
    }
}






const mapStateToProps = (state)=>{
    return{
 userProfile:state.userR.userProfile
    
    // post:state.postRed.email,
    // post:state.postRed.password,
    // newPost: state.post.userCred
    }
}

export default connect(  mapStateToProps, mapDispatchToProps) (Header);