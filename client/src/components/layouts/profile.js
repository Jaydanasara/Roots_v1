import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ProfileContent from "../content/profileContent";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";

// import API from "../../utils/API";

// import "./roots.css";

class Profile extends React.Component {



    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }

    




    render() {
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
console.log(this.props)
const {userInfo}=this.props;
        return (
            <div className="app-container">
        
                <section id="left-menu">
                   <LeftMenu/>
                </section>


                <section className="content-Container">
                  
                        
                            <Navbar userInfo={this.props.userInfo}/>
                            <ProfileContent userInfo={this.props} />
                            

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger/>
                </section>

            </div>
        )
    }



};



const mapStateToProps = (state)=>{
    console.log(state)
    return{
 userInfo:state.userR.userProfile
    
   
    }
}

export default connect(  mapStateToProps ) (Profile);




