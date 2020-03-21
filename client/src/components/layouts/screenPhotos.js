import React from "react";
import Fire from "../../config/fire";
import ScrNavbar from "../navbar/scrnavbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScrPhotosPage from "../photosPage/scrPhotosPage"

// import "./roots.css";

class ScreenPhotos extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading:true

    }
    }
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

        return (
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>

                </section>


                <section className="content-Container">
                  
                        
                <ScrNavbar whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <ScrPhotosPage userInfo={this.props}/>

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger userInfo={this.props.userInfo} />
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

export default connect(  mapStateToProps ) (ScreenPhotos);




