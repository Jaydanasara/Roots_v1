import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import ScrMiniBar from "../../components/navbar/scrMiniBar";
import Content from "../content/content";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ScreenName from "../screenName/screenName";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions";
import SideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat"





class Layout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true,
        sideDrawerOpen:false,
        isOnCall:false,
        friendsPhId:""
    }
    }
 componentDidMount(){
    // this.screenNameData()
        if (this.props.userInfo.emailaddress==="" ){
            this.logout()
        }
        else{
            this.screenNameData()
        }
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
        console.log(this.props)

        API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading:false })
                
                 console.log(res)


            })

            .catch(err => console.log(err));

    }

    callScreen=(id)=>{
        console.log(id)
        this.setState({isOnCall:true, friendsPhId:id})

    }

    callScreenClose = ()=>{
        this.setState({isOnCall:false})
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
                  <ScrMiniBar userInfo= {this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                    <ScreenName screenInfo={this.state.screenNameInfo} disState={this.props} userInfo= {this.props.userInfo}  />
                </section>


                <section className="content-Container">
                  
                        
                            <Navbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                            {
                            this.state.isOnCall===true?
                            <VideoChat userInfo={this.props}  callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId} /> :
                            null
                            }
                            <Content userInfo={this.props.userInfo} disState={this.props}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                            
                           {backDrop}

                      
                    
                </section>
                <section className="messenger-area">
              
                <Messenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo} openCallWindow={this.callScreen}/>
                
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

export default connect(  mapStateToProps,mapDispatchToProps) (Layout);




