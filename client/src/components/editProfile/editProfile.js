import React from "react"
import { auth } from "../../config/firebase"
import Navbar from "../navbar/navbar";
import ProfileEditor from "../profileEditor/profileEditor";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScreenName from "../screenName/screenName";
import ScrMiniBar from "../../components/navbar/scrMiniBar";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions";
import ScrSideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat"

class EditProfile extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true,
        sideDrawerOpen:false,
        isOnCall:false,
        friendsPhId:"",
        receivingCall: false,
        caller: {},
        callerSignal: null,
        yourInfo: {},
        users:[],
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

    callScreen=(id)=>{
        console.log(id)
        this.setState({isOnCall:true, friendsPhId:id})

    }


    incomingCallScreen=(receivingCall, caller, callerSignal)=>{
        this.setState({ receivingCall: receivingCall, caller: caller, callerSignal: callerSignal,isOnCall:true })
        console.log("incoming call screen")
       

    }

    callScreenClose = ()=>{
        this.setState({isOnCall:false})
    }
 
    getYourInfo=(yourInfo)=>{
        console.log(yourInfo)

        this.setState({yourInfo:yourInfo})

    }
    
    getUsers=(users)=>{
        console.log(users)
        this.setState({users:users})

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
                  <ScreenName userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                            <Navbar  drawerClickHandler={this.drawToggleClickHandler}  userInfo={this.props.userInfo}  whichName={this.state.isUserPage}  />
                           
                            {
                            this.state.isOnCall===true?
                            <VideoChat userInfo={this.props}  callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId}
                            receivingCall={this.state.receivingCall} caller={this.state.caller}callerSignal={this.state.callerSignal}
                            yourInfo={this.state.yourInfo} users={this.state.users}
                            /> :
                            null
                            }
                           
                            <ProfileEditor userInfo={this.props.userInfo} disState={this.props}/>
                            
                            <ScrSideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo} openCallWindow={this.callScreen}
                             incomingCallScreen={this.incomingCallScreen} users={this.getUsers} yourInfo={this.getYourInfo}/>
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

export default connect(mapStateToProps,mapDispatchToProps ) (EditProfile);




