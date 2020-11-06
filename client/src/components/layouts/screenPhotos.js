import React from "react";
import { auth } from "../../config/firebase"
import ScrNavbar from "../navbar/scrnavbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScrPhotosPage from "../photosPage/scrPhotosPage"
import ScrSideDrawer from "../../components//sideDrawer/scrSideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";


class ScreenPhotos extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading:true,
        sideDrawerOpen:false,

    }
    }
    logout() {
        auth.auth().signOut().then(function () {
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



    render() {
        let backDrop;
       
        if(this.state.sideDrawerOpen){
         backDrop = <BackDrop click={this.backDropHandler }/>;
        }   
console.log(this.props)

        return (
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>

                </section>


                <section className="content-Container">
                  
                        
                <ScrNavbar drawerClickHandler={this.drawToggleClickHandler}  whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <ScrPhotosPage userInfo={this.props}/>
                            <ScrSideDrawer show={this.state.sideDrawerOpen}/>
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

export default connect(  mapStateToProps ) (ScreenPhotos);




