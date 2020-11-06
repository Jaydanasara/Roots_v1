import React from "react";
import { auth } from "../../config/firebase"
import ScrNavbar from "../navbar/scrnavbar";
import MiniBar from "../navbar/miniBar";
import MiniContent from "../content/miniContent";
import ScreenMessenger from "../messenger/screenNameMessenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import LgScreenName from "../screenName/lgScreenName";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"
import ScrSideDrawer from "../../components//sideDrawer/scrSideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";



class ScreenLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:false,
        sideDrawerOpen:false,
    }
    }
    componentDidMount(){
        this.screenNameData()
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
                  <LeftMenu userInfo={this.props.userInfo}/>
                  <MiniBar userInfo={this.props.userInfo}/>
                    <MiniContent userInfo={this.props.userInfo} disState={this.props}/>
                </section>


                <section className="content-Container">
                  
                        
                <ScrNavbar drawerClickHandler={this.drawToggleClickHandler}  screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                            <LgScreenName userInfo={this.props.userInfo} disState={this.props} screenInfo={this.state.screenNameInfo}/>
                            <ScrSideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}   


                      
                    
                </section>
                <section className="messenger-area">
                <ScreenMessenger userInfo={this.props.userInfo}  screenInfo={this.state.screenNameInfo} />
                </section>

            </div>
        )
    }



};



const mapDispatchToProps = (dispatch) =>{
    return{
        getUser: ( currentUserInfo) => dispatch (getUser(currentUserInfo))
    }
}

const mapStateToProps = (state)=>{
    console.log(state)
    return{
 userInfo:state.userR.userProfile
    
   
    }
}

export default connect(  mapStateToProps,mapDispatchToProps ) (ScreenLayout);




