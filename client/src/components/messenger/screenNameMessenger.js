import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import BackDrop from "../sideDrawer/backDrop/backDrop";
import SocketContext from "../../context/SocketProvider"
import NotificationModal from "../modal/NotificationModal";


let mesAlert = new Audio("./mesAlert.mp3")

class ScreenMessenger extends React.Component {

    static contextType=SocketContext

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
        onlineFriends:[],
        unreadMessages:[],
        sender_id:"",
        isNotiOpen:false,

    }
    
}
    componentDidMount() {
        console.log(this.props.screenInfo)
        this.setState({sender_id:this.props.screenInfo._id})
        const  socket=this.context
        console.log(this.props.screenInfo)
        console.log(this.props)

        this.Unreadchats()
         this.listFriends()


         
        socket.emit("join-room",this.props.userInfo.firstname, this.props.userInfo.user_ID,this.props.screenInfo.screenName, this.props.screenInfo._id)
        socket.emit("send-Id",  this.props.screenInfo._id)
       
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

       
          socket.on('receive-message', (data) => {
            mesAlert.play()
            
            if (this.state.isOpen===false){
                
                this.props.saveInstantMessage(data.friends_id,data)
                this.props.newMessage()

            }
        })

    }



    activateFunctions=(id)=>{

        this.getChat()
        this.messageHasBeenRead(id)
    
    }



    listFriends = () => {
        if(this.props.screenInfo.friends.length){

        API.getScreenFriends({ friends:this.props.screenInfo.friends })

            .then(res => {

                this.setState({ allFriends: res.data })
                console.log(res.data)


            })

            .catch(err => console.log(err));

        }

    }





    getChat=()=>{
    
        let chatMembers=[this.state.chFriends_id, this.props.screenInfo._id]
        chatMembers.sort()
        console.log (chatMembers)
        API.getConvo({users:chatMembers})
        
        .then(res => {
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

        let chatMembers=[this.state.chFriends_id, this.props.screenInfo._id]
        chatMembers.sort()
        console.log (chatMembers)

        API.saveChat({
            usersFirstNames:[this.state.chFriendsName, this.props.screenInfo.screenName],
           
            users:chatMembers,
            user_id:this.state.chFriends_id
        })
    
        .then(res => {
            this.setState({messageID:res.data._id, allChatInfo:[res.data]})
        })
        .catch(err => console.log(err));
     
    }


    Unreadchats =()=>{
        API.getUnreadChats({user:this.props.screenInfo._id})

        .then(res=>{
            console.log(res)

            if(res.data.length>0){
                let unreadMessages = []
                res.data.forEach(chat=> {
                    console.log(chat.messages[chat.messages.length -1].sender)
                    if (chat.messages[chat.messages.length -1].sender !==this.props.screenInfo.screenName){

                        for(var i = 0; i<chat.users.length;i++){
                            if(chat.users[i] !== this.props.screenInfo._id){
                                unreadMessages.push(chat.users[i])
                                console.log(unreadMessages)
                            }
                        }
                        
                     
                    }
                   
                });
        
                 this.setState({unreadMessages :unreadMessages})
               
            }else {
                return
            }



        })

        .catch(err => console.log(err)); 
    }
    




    messageHasBeenRead=(id)=>{
        console.log("messenger has read")
        console.log(id)
        console.log(this.state.unreadMessages)

        if(this.state.unreadMessages.includes(id)){

            const unreadMessages= this.state.unreadMessages.filter(message => message !== id);

            console.log(unreadMessages)
            this.setState({ unreadMessages:unreadMessages });

            this.receiverHasRead(id)

        }

        
    }


    receiverHasRead=(id)=>{
        let chatMembers=[id, this.props.screenInfo._id]
        chatMembers.sort()
        API.receiverHasRead({users:chatMembers})

        .then(res=>{
            console.log(res)

        })

        .catch(err=>console.log(err))
    }
    

    friendsOnline=()=>{
        if(this.props.screenInfo.friends){
        let onlineFriends = []
        this.state.users.forEach(user=> {
            console.log(user.scrId)
            if (this.props.screenInfo.friends.includes(user.scrId)){
                
                onlineFriends.push(user.scrId)
            }
           
        });

        this.setState({onlineFriends :onlineFriends})
        console.log(onlineFriends)
    }else {
        return
    }
    }


    backdropClicked = () => {

      
        this.props.notiClose()
    }


    render() {

        console.log(this.props)
        console.log(this.props.screenInfo.friends)
        console.log(this.state.chFriends_id)

        let backDrop;
        let notificationModal;

        
        if ( this.props.isNotiOpen===true) {
            backDrop = <BackDrop click={this.backdropClicked} />;
        }
     
        if(this.props.isNotiOpen===true){
            notificationModal= <NotificationModal submitComment={this.submitComment} removeLikes={this.removeLikes} handleLikes={this.handleLikes}
             handleChange={this.handleChange} handleImageSelected2={this.handleImageSelected2} handleUpload={this.handleUpload}  getID={this.getID}
             editCommentClicked={this.editCommentClicked} removeComment={this.removeComment} commentOptions={this.commentOptions} removePost={this.removePost} editPostClicked={this.editPostClicked}
             optionsClicked={this.optionsClicked}  userInfo={this.props.userInfo} notiPost={this.props.notiPost} backdropClicked={this.backdropClicked} />
         }
 

        return (
            <div className="messengerContainer">

                {backDrop}
                {notificationModal}

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
                                                
                                                <Link to={"/profile/" + uFriends._id}> <img className="onlineFriendImg" src={(uFriends.userPic!==undefined && uFriends.userPic!=="") ? uFriends.userPic:"https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt = "friends pic" /> 
                                                </Link> 
                                            </div>
                                            <div className="onlineFriendName" onClick={(e) => 
                                                 this.setState({ isOpen: true, chFriendsName: uFriends.screenName, 
                                                avatar:uFriends.userPic, chFriends_id:uFriends._id , chFriendsEmail:uFriends.emailaddress},()=>this.activateFunctions(uFriends._id)) } > 
                                            {uFriends.screenName}</div>
                                            <div className={(this.state.onlineFriends.includes(uFriends._id))?"onChatting" :"chatting"}> 
                                            <i  className={(this.state.unreadMessages.includes(uFriends._id))? "far fa-comment unreadMessages": "far fa-comment "  }></i>
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

                        <Modal callAFriend={this.props.openCallWindow} allChatInfo={this.state.allChatInfo} screenInfo={this.props.screenInfo} userInfo={this.props.userInfo} sender={this.props.userInfo.screenName} fullName={this.props.userInfo.screenName} isOpen={this.state.isOpen} avatar={this.state.avatar}  chFriendsName={this.state.chFriendsName}
                        sender_id={this.state.sender_id} messageID={this.state.messageID} chFriends_id={this.state.chFriends_id} chFriendsEmail={this.state.chFriendsEmail} getChat={this.getChat} onClose={(e) => this.setState({ isOpen: false })}  />
                    </div>
                    <div className="chatSearch">
                        <input type="text " className="chatInput" placeholder="Search" />

                    </div>


                </div>


            </div>

        )
    }

};


export default ScreenMessenger;