import React from "react";
import Fire from "../../config/fire";
import Navbar from "../navbar/navbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import VideoChat from "../messenger/videoChat"

import API from "../../utils/API";
import SideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
// import "./roots.css";

class VideoChatLayout extends React.Component {
    

        constructor(props)  {
            super(props)
        this.state= {
            screenNameInfo:{},
            isLoading: true,
            isUserPage:true,
            sideDrawerOpen:false,
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
    

        drawToggleClickHandler=()=>{
            this.setState((prevState)=>{
                return {sideDrawerOpen:!prevState.sideDrawerOpen};
            });
        }
    
        backDropHandler=()=>{
            this.setState({sideDrawerOpen:false})
        };

        
        screenNameData = () => {
    
            API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })
    
                .then(res => {
                    this.setState({ screenNameInfo: res.data, isLoading:false })
                    
                     console.log(res)
    
    
                })
    
                .catch(err => console.log(err));
    
        }
    

    render() {
        let backDrop;
       
        if(this.state.sideDrawerOpen){
         backDrop = <BackDrop click={this.backDropHandler }/>;
        }

        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                  
                </section>


                <section className="content-Container">
                  
                        
                <Navbar drawerClickHandler={this.drawToggleClickHandler} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <VideoChat userInfo={this.props}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
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

export default connect(  mapStateToProps ) (VideoChatLayout);