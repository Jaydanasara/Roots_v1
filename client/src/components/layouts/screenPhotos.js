import React from "react";
import { auth } from "../../config/firebase"
import SocketContext from "../../context/SocketProvider";
import ScrNavbar from "../navbar/scrnavbar";
import ScreenMessenger from "../messenger/screenNameMessenger";
import { connect } from "react-redux";
import API from "../../utils/API";
import LeftMenu from "../leftMenu/leftMenu"
import ScrPhotosPage from "../photosPage/scrPhotosPage"
import ScrSideDrawer from "../../components//sideDrawer/scrSideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat";

class ScreenPhotos extends React.Component {
    static contextType = SocketContext
    constructor(props) {
        super(props)
        this.state = {
            screenNameInfo: {},
            isLoading: true,
            isUserPage: false,
            sideDrawerOpen: false,
            isOnCall: false,
            friendsPhId: "",
            receivingCall: false,
            caller: {},
            callerSignal: null,
            yourInfo: {},
            users: [],
            numberOfMessages: 0,
            messages: [],
            numberOfNotifications: 0,
            notifications:[],
            notiPost:[],
            isNotiOpen:false


        }
    }
    componentDidMount() {
        this.screenNameData()

       
    
    
        const socket = this.context

        
        socket.on('receive-notification', (data) => {
            console.log("go go")

           console.log(data)
           

            // this.newNotification()
            this.setState({ notifications:data.notifications.notifications, numberOfNotifications: data.notifications.notifications.length })
        })
    
    }



    logout() {
        auth.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }


    drawToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    }

    backDropHandler = () => {
        this.setState({ sideDrawerOpen: false })
    };


    screenNameData = () => {

        API.getScreenNameInfo({ _id: this.props.userInfo.scrUser_id })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading: false})

                console.log(res)


                if (res.data.messages.length) {
                    this.setState({ numberOfMessages: res.data.messages.length, messages: res.data.messages })
                }
                else {
                    this.setState({ messages:res.data.messages })
                }
        
                if (res.data.notifications.length) {
                    this.setState({ numberOfNotifications: res.data.notifications.length, notifications: res.data.notifications })
                }
                else {
                    this.setState({ notifications: res.data.notifications })
                }


            })

            .catch(err => console.log(err));

    }


    callScreen = (id) => {
        console.log(id)
        this.setState({ isOnCall: true, friendsPhId: id })

    }


    incomingCallScreen = (receivingCall, caller, callerSignal) => {
        this.setState({ receivingCall: receivingCall, caller: caller, callerSignal: callerSignal, isOnCall: true })
        console.log("incoming call screen")


    }

    callScreenClose = () => {
        this.setState({ isOnCall: false })
    }

    getYourInfo = (yourInfo) => {
        console.log(yourInfo)

        this.setState({ yourInfo: yourInfo })

    }

    getUsers = (users) => {
        console.log(users)
        this.setState({ users: users })

    }


    newMessage = () => {

        var numberOfMessages = this.state.numberOfMessages + 1
        console.log(numberOfMessages)
        this.setState({ numberOfMessages: numberOfMessages })
    }

    saveInstantMessage = (id, data) => {
        console.log(data)
        API.saveInstantMessage(id, {
            name: data.name,
            user_id: data.id,
            userPic: data.userPic,
            emailaddress: data.email
        })

            .then(res => {

                this.setState({ messages: res.data.messages, numberOfMessages: this.state.messages.length })
                console.log(res)


            })

            .catch(err => console.log(err));
    }

    saveNotification = (id, data,post_id) => {
        
        console.log(data)
        API.saveSCNotification(id, {
            name: data.name,
            user_id: data.user_id,
            userPic: data.userPic,
            content:data.comment,
            post_id:post_id
            
        })

            .then(res => {

                
                console.log(res)
                const socket = this.context
        socket.emit('send-notification', ({
            notifications:res.data,
             id:id, friends_id:data.user_id
        }))

            })

            .catch(err => console.log(err));
    }

    removeAllInstMessages = (id) => {

        API.removeMessages(id)

            .then(res => {
                console.log(res)
                this.setState({ messages: res.data.messages, numberOfMessages: res.data.messages.length })
            })

            .catch(err => console.log(err));

        this.props.getUser(auth.currentUser.email)
    }





    removeNotification = (id,noteId) => {
       

        API.removeSCNotification(id,{
            
            _id:noteId})

            
            .then(res => {

                console.log(res)
                
                this.setState({ notifications: res.data.notifications, numberOfNotifications: res.data.notifications.length })
            })

            .then(res => {

                this.props.getUser(auth.currentUser.email)
               console.log(this.state.numberOfNotifications)
            })


            .catch(err => console.log(err));

       
    }


    viewNotiPost= (post_id)=>{

        API.getNotiPost(post_id)

        .then(res=>{
            console.log(res)
            this.setState({notiPost:[res.data], isNotiOpen:true})

        })

        .catch(err => console.log(err));

    }

    notiClose =()=>(
        this.setState({isNotiOpen:false})
    )


    render() {
        let backDrop;

        if (this.state.sideDrawerOpen) {
            backDrop = <BackDrop click={this.backDropHandler} />;
        }

        return (
            this.state.isLoading === true ? <div className="loading">Loading</div> :
                <div className="app-container">

                    <section id="left-menu">
                        <LeftMenu />

                    </section>


                    <section className="content-Container">


                        <ScrNavbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo}
                            newMessages={this.state.numberOfMessages} instMessages={this.state.messages} removeAllInstMessages={this.removeAllInstMessages} 
                            newNotifications={this.state.numberOfNotifications} notifications={this.state.notifications} removeNotification ={this.removeNotification } viewNotiPost={this.viewNotiPost}/>

                        {
                            this.state.isOnCall === true ?
                                <VideoChat userInfo={this.props} callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId}
                                    receivingCall={this.state.receivingCall} caller={this.state.caller} callerSignal={this.state.callerSignal}
                                    yourInfo={this.state.yourInfo} users={this.state.users}
                                /> :
                                null
                        }

                        <ScrPhotosPage userInfo={this.props}  screenInfo={this.state.screenNameInfo} saveNotification={this.saveNotification} notiPost={this.state.notiPost} isNotiOpen={this.state.isNotiOpen}
                        notiClose={this.notiClose} viewNotiPost={this.viewNotiPost}  />
                        <ScrSideDrawer  show={this.state.sideDrawerOpen} />
                        {backDrop}



                    </section>
                    <section className="messenger-area">
                        <ScreenMessenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo} openCallWindow={this.callScreen}
                            incomingCallScreen={this.incomingCallScreen} users={this.getUsers} yourInfo={this.getYourInfo}
                            newMessage={this.newMessage} saveInstantMessage={this.saveInstantMessage} />
                    </section>

                </div>
        )
    }



};



const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.userR.userProfile


    }
}








export default connect(mapStateToProps)(ScreenPhotos);




