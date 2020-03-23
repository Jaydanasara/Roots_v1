import React from "react";
import Fire from "../../config/fire";
import Navbar from "../navbar/navbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import PhotosPage from "../photosPage/PhotosPage"

import API from "../../utils/API";
// import "./roots.css";

class UserPhotos extends React.Component {
    

        constructor(props)  {
            super(props)
        this.state= {
            screenNameInfo:{},
            isLoading: true,
            isUserPage:true
        }
        }
        componentDidMount(){
            this.screenNameData()
        }
    
    
    
        logout() {
            Fire.auth().signOut().then(function () {
                console.log("Sign-out successful")
            }).catch((error) => {
                console.log(error);
            });
        }
    
        
        screenNameData = () => {
    
            API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })
    
                .then(res => {
                    this.setState({ screenNameInfo: res.data, isLoading:false })
                    
                     console.log(res)
    
    
                })
    
                .catch(err => console.log(err));
    
        }
    

    render() {
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
console.log(this.props)

        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                  
                </section>


                <section className="content-Container">
                  
                        
                <Navbar whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <PhotosPage userInfo={this.props}/>

                      
                    
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

export default connect(  mapStateToProps ) (UserPhotos);




