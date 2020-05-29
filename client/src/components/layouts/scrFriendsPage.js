import React from "react";
import Fire from "../../config/fire";
import ScrNavbar from "../navbar/scrnavbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScrFriends from "../friendsList/scrFriends"
import API from "../../utils/API";
import ScrSideDrawer from "../../components//sideDrawer/scrSideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";

class ScrFriendsPage extends React.Component {
    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading:true,
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

        API.getScreenNameInfo({ _id: this.props.match.params.id, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading:false})
                
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
                  
                        
                <ScrNavbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <ScrFriends userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
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

export default connect(  mapStateToProps ) (ScrFriendsPage);




