import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import socketIOClient from "socket.io-client";
var socket;

class Messenger extends React.Component {
    constructor(props){
        super(props);
      
    this.state = {
        allFriends: [],
        isOpen:false,
        chFriendsName:"",
        chFriends_id:"",
        avatar:"",
        chFriendsEmailaddress:"",
        messageID:"",
        allChatInfo:[],
        socket:null,
        receivingCall: false,
        caller: {},
        callerSignal: null,
        yourInfo: {},
        users:[],
        endpoint:"/",
        onlineFriends:[]
      

    }
    socket =  socketIOClient(this.state.endpoint);
    }
    
    componentWillMount() {
        console.log(this.props)
        this.listFriends()

        socket.emit("join-room",this.props.userInfo.firstname, this.props.userInfo.user_ID)
       
       
        socket.on("yourinfo", (info) => {
            console.log(info)
            this.setState({ yourInfo: info },()=>{this.props.yourInfo(this.state.yourInfo)});
        })
        socket.on("allUsers", (users) => {
            console.log(users)
            this.setState({ users: users },()=>{this.friendsOnline()})
            this.props.users(users)
        })

        socket.on("hey", (data) => {
            console.log("hey front end ")
            this.setState({ receivingCall: true, caller: data.from, callerSignal: data.signal },()=>
            {this.props.incomingCallScreen(this.state.receivingCall, this.state.caller, this.state.callerSignal)})

        })

        socket.on("user-disconnect", (usersid) => {
            console.log(usersid )
           
          })

       
    }







    listFriends = () => {

        API.getFriendsList({friends: this.props.userInfo.friends})

            .then(res => {

                this.setState({ allFriends: res.data })
                console.log(res.data)


            })

            .catch(err => console.log(err));

    }


    getChat=()=>{
    
        let chatMembers=[this.state.chFriends_id, this.props.userInfo.user_ID]
        chatMembers.sort()
        console.log (chatMembers)
        API.getConvo({users:chatMembers})
        
        .then(res => {
            console.log(res)
            console.log(this.state.isOpen)
            if (res.data===null){
                this.saveConvo()
            }else{
                this.setState({messageID:res.data._id, allChatInfo:[res.data]})
                console.log(res.data)
            }
        })
        .catch(err => console.log(err)); 
     
    }
    
    
    
    saveConvo=()=>{

        let chatMembers=[this.state.chFriends_id, this.props.userInfo.user_ID]
        chatMembers.sort()
        console.log (chatMembers)

        API.saveChat({
            usersFirstNames:[this.state.chFriendsName,this.props.userInfo.firstname],
           
            users:chatMembers,
            user_id:this.state.chFriends_id
        })
    
        .then(res => {
            console.log(res)
            this.setState({messageID:res.data._id, allChatInfo:[res.data]})
        })
        .catch(err => console.log(err));
     
    }

    messageHasBeenRead=()=>{
        
    }
    

    friendsOnline=()=>{
        if(this.props.userInfo.friends){
        let onlineFriends = []
        this.state.users.forEach(user=> {
            console.log(user.userid)
            if (this.props.userInfo.friends.includes(user.userid)){
                
                onlineFriends.push(user.userid)
            }
           
        });

        this.setState({onlineFriends :onlineFriends})
        console.log(onlineFriends)
    }else {
        return
    }
    }


    render() {
        console.log(this.state.allChatInfo)
        console.log(this.props)
        console.log(this.state.messageID)
        return (
            <div className="messengerContainer">

                <div className="messengerHead">
                    <div className="chatIcon">
                        <i className="far fa-comments"></i>
                    </div>
                    <div className="messengerTitle">
                        Messenger
                    </div>
                    <div className="optionIcon">
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div className="onlineFriends">
                    <div className="chatContainer">

                        {this.state.allFriends.length ? (

                            <div>
                                {this.state.allFriends.map(uFriends => {
                                    return (

                                        <div key={uFriends._id} className={(this.state.onlineFriends.includes(uFriends._id))?"chatFriends active":"chatFriends"}>
                                            <div className="onlineFriendI">
                                                
                                                <Link to={"/profile/" + uFriends._id}> <img className="onlineFriendImg" src={(uFriends.userPic!==undefined) ? uFriends.userPic: "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Frootsicon.jpg?alt=media&token=f8f88ae3-3534-4591-b72e-1f92eb9d40f4"}  alt = " friends pic" /> 
                                                </Link> 
                                            </div>
                                            <div className="onlineFriendName" onClick={(e) => 
                                                 this.setState({ isOpen: true, chFriendsName: uFriends.firstname + " " + uFriends.lastname, 
                                                avatar:uFriends.userPic, chFriends_id: uFriends._id , chFriendsEmail:uFriends.emailaddress},()=>this.getChat()) } > 
                                            {uFriends.firstname + " " + uFriends.lastname}</div>
                                            <div className={(this.state.onlineFriends.includes(uFriends._id))?"onChatting":"chatting"}> <i  className="far fa-comment"></i>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>

                        ) : (
                                <h1>No Friends to display</h1>
                            )}
                    </div>
                    <div className="modalBox">

                        <Modal callAFriend={this.props.openCallWindow} allChatInfo={this.state.allChatInfo} userInfo={this.props.userInfo} sender={this.props.userInfo.firstname} fullName={this.props.userInfo.firstname + "_" + this.props.userInfo.lastname} isOpen={this.state.isOpen} avatar={this.state.avatar}  chFriendsName={this.state.chFriendsName}
                        user_id={this.state.user_id} messageID={this.state.messageID} chFriends_id={this.state.chFriends_id} chFriendsEmail={this.state.chFriendsEmail} getChat={this.getChat} onClose={(e) => this.setState({ isOpen: false })} />
                    </div>
                    <div className="chatSearch">
                        <input type="text " className="chatInput" placeholder="Search" />

                    </div>


                </div>


            </div>

        )
    }

};

export {socket}
export default Messenger;