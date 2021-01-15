import React from "react";
import {auth} from "../../config/firebase";
import Navbar from "../navbar/navbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import FriendsList from "../friendsList/friendsList"
import ScreenName from "../screenName/screenName";
import API from "../../utils/API";
import ScrMiniBar from "../navbar/scrMiniBar";
import SideDrawer from "../../components//sideDrawer/sideDrawer";

import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat"
// import "./roots.css";

class FriendsPage extends React.Component {

   
    constructor(props)  {
        super(props)
        this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true,
        sideDrawerOpen:false,
        friends:[],
        firstname:"",
        lastname:"",
        isOnCall:false,
        friendsPhId:"",
        receivingCall: false,
        caller: {},
        callerSignal: null,
        yourInfo: {},
        users:[],
        numberOfMessages:0,
        messages:[]
    }
    }
    componentDidMount(){
        this.getFriends()
        this.screenNameData()
        if (this.props.userInfo.messages.length) {
            this.setState({ numberOfMessages: this.props.userInfo.messages.length, messages: this.props.userInfo.messages })
        }
        else {
            this.setState({ messages: this.props.userInfo.messages })
        }

    }



    logout() {
        auth.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }

    getFriends=() =>{
        API.getFriendsinfo({_id:this.props.match.params.id})

        .then (res=>{
            this.setState({friends:res.data[0].friends,firstname:res.data[0].firstname,lastname:res.data[0].lastname})
            console.log(res.data)
        })
        .catch(err=> console.log(err));
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


    newMessage=()=>{
        
        var numberOfMessages=this.state.numberOfMessages +1
        console.log(numberOfMessages)
        this.setState({numberOfMessages:numberOfMessages})
    }

    saveInstantMessage=(id,data)=>{
        console.log(data)
        API.saveInstantMessage(id,{
            name:data.name,
            user_id:data.id,
            userPic:data.userPic,
            emailaddress:data.email
        })

        .then(res => {
           
            this.setState({messages:res.data.messages,numberOfMessages:this.state.messages.length})
             console.log(res)


        })

        .catch(err => console.log(err));
    }


    removeAllInstMessages =(id)=>{
       
        API.removeMessages(id)

        .then(res=>{
            console.log(res)
            this.setState({messages:res.data.messages,numberOfMessages:res.data.messages.length})
        })

        .catch(err => console.log(err));

        this.props.getUser( auth.currentUser.email)
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
                  <ScrMiniBar userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                  <ScreenName userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                <Navbar drawerClickHandler={this.drawToggleClickHandler}  whichName={this.state.isUserPage} userInfo={this.props.userInfo} 
                 newMessages={this.state.numberOfMessages} instMessages={this.state.messages} removeAllInstMessages={this.removeAllInstMessages}/>
                
                {
                            this.state.isOnCall===true?
                            <VideoChat userInfo={this.props}  callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId}
                            receivingCall={this.state.receivingCall} caller={this.state.caller}callerSignal={this.state.callerSignal}
                            yourInfo={this.state.yourInfo} users={this.state.users} 
                            /> :
                            null
                            }
                            <FriendsList userInfo={this.props.userInfo} friendsinfo={this.state.friends} firstName={this.state.firstname} lastName={this.state.lastname}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
                </section> 
                <section className="messenger-area">
                <Messenger userInfo={this.props.userInfo}  screenInfo={this.state.screenNameInfo} openCallWindow={this.callScreen}
                             incomingCallScreen={this.incomingCallScreen} users={this.getUsers} yourInfo={this.getYourInfo} />
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

export default connect(  mapStateToProps ) (FriendsPage);




