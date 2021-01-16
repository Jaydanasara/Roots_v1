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
import { getUser } from "../../store/actions/userActions"
import ScrSideDrawer from "../../components//sideDrawer/scrSideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import VideoChat from "../messenger/videoChat";



class ScreenLayout extends React.Component {

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
            messages: []
        }
    }
    componentDidMount() {

        console.log(this.props)
        this.screenNameData()
        
        


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

        API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading: false, numberOfMessages:res.data.numberOfMessages, messages:res.data.messages})

                console.log(res)


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
        API.saveSCInstantMessage(id, {
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


    removeAllInstMessages = (id) => {

        API.removeSCMessages(id)

            .then(res => {
                console.log(res)
                this.setState({ messages: res.data.messages, numberOfMessages: res.data.messages.length })
            })

            .catch(err => console.log(err));

            this.screenNameData()
    }









    render() {

        
        let backDrop;

        if (this.state.sideDrawerOpen) {
            backDrop = <BackDrop click={this.backDropHandler} />;
        }

        return (

            this.state.isLoading === true ? <div className="loading">Loading</div> :

                <div className="app-container">

                    <section id="left-menu">
                        <LeftMenu userInfo={this.props.userInfo} />
                        <MiniBar userInfo={this.props.userInfo} />
                        <MiniContent userInfo={this.props.userInfo} disState={this.props} />
                    </section>


                    <section className="content-Container">


                        <ScrNavbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo}
                         newMessages={this.state.numberOfMessages} instMessages={this.state.messages} removeAllInstMessages={this.removeAllInstMessages} />
                        
                        {
                            this.state.isOnCall === true ?
                                <VideoChat userInfo={this.props} callEnded={this.callScreenClose} friendsPhId={this.state.friendsPhId}
                                    receivingCall={this.state.receivingCall} caller={this.state.caller} callerSignal={this.state.callerSignal}
                                    yourInfo={this.state.yourInfo} users={this.state.users}
                                /> :
                                null
                        }
                        
                        <LgScreenName userInfo={this.props.userInfo} disState={this.props} screenInfo={this.state.screenNameInfo} />
                        <ScrSideDrawer show={this.state.sideDrawerOpen} />
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



const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (currentUserInfo) => dispatch(getUser(currentUserInfo))
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.userR.userProfile


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenLayout);




