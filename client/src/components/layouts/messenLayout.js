import React from "react";
import { auth } from "../../config/firebase"
import Navbar from "../../components/navbar/navbar";

import Messenger from "../messenger/messenger";
import { connect } from "react-redux";

import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"
import SideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat"



class MessenLayout extends React.Component {

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
        numberOfMessages:0,
        messages:[]

    }
    }
 componentDidMount(){
        
        if (this.props.userInfo.emailaddress==="" ){
            this.logout()
        }
        else{
            this.screenNameData()
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
               
                  
                </section>


                <section className="content-Container">
                  
                
                            <Navbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} 
                             newMessages={this.state.numberOfMessages} instMessages={this.state.messages} removeAllInstMessages={this.removeAllInstMessages}/>
                          
                            {
                            this.state.isOnCall===true?
                            <VideoChat userInfo={this.props}  callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId}
                            receivingCall={this.state.receivingCall} caller={this.state.caller}callerSignal={this.state.callerSignal}
                            yourInfo={this.state.yourInfo} users={this.state.users}
                            /> :
                            null
                            }

                            <Messenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo} openCallWindow={this.callScreen}
                             incomingCallScreen={this.incomingCallScreen} users={this.getUsers} yourInfo={this.getYourInfo}
                             newMessage={this.newMessage} saveInstantMessage={this.saveInstantMessage}
                             />
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
                </section>
                <section className="messenger-area">
              
                
                
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

export default connect(  mapStateToProps,mapDispatchToProps) (MessenLayout);




