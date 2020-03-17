import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Content from "../content/content";
import Modal from "../modal/modal";




class ScreenMessenger extends React.Component {

    state = {
        allFriends: [],
        isOpen:false,
        chFriendsName:"",
        user_id:"",
        avatar:"",
        chFriendsEmailaddress:"",
        messageID:"",
        allChatInfo:[],
        socket:null,

    }

    
    componentWillMount() {
         this.listFriends()
    }







    listFriends = () => {

        API. getScreenFriends({ friends:this.props.screenInfo.friends })

            .then(res => {

                this.setState({ allFriends: res.data })
                console.log(res.data)


            })

            .catch(err => console.log(err));

    }





    getChat=()=>{
    
        let chatMembers=[this.state.chFriendsEmail, this.props.userInfo.emailaddress]
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

        let chatMembers=[this.state.chFriendsEmail, this.props.userInfo.emailaddress]
        chatMembers.sort()
        console.log (chatMembers)

        API.saveChat({
            usersFirstNames:[this.state.chFriendsName],
           
            users:chatMembers,
            user_id:this.state.user_id
        })
    
        .then(res => {
            this.setState({messageID:res.data._id})
        })
        .catch(err => console.log(err));
     
    }

    messageHasBeenRead=()=>{
        
    }



    render() {
       
        console.log(this.props.screenInfo.friends)
     
        return (
            <div className="messengerContainer">

                <div className="messengerHead">
                    <div className="chatIcon">
                        <i class="far fa-comments"></i>
                    </div>
                    <div className="messengerTitle">
                        Messenger
                    </div>
                    <div className="optionIcon">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div className="onlineFriends">
                    <div className="chatContainer">

                        {this.state.allFriends.length ? (

                            <div>
                                {this.state.allFriends.map(uFriends => {
                                    return (

                                        <div className="chatFriends active">
                                            <div className="onlineFriendI">
                                                <a className="friends-I" > 
                                                <Link to={"/profile/" + uFriends._id}> <img className="onlineFriendImg" src={uFriends.userPic} /> 
                                                </Link> </a>
                                            </div>
                                            <div className="onlineFriendName" onClick={(e) => 
                                                 this.setState({ isOpen: true, chFriendsName: uFriends.firstname + " " + uFriends.lastname, 
                                                avatar:uFriends.userPic, user_id:uFriends._id , chFriendsEmail:uFriends.emailaddress},()=>this.getChat()) } > 
                                            {uFriends.firstname + " " + uFriends.lastname}</div>
                                            <div className="chatting"> <i class="far fa-comment"></i>
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

                        <Modal allChatInfo={this.state.allChatInfo} userInfo={this.props.userInfo}  isOpen={this.state.isOpen} avatar={this.state.avatar}  chFriendsName={this.state.chFriendsName}
                        user_id={this.state.user_id} messageID={this.state.messageID} chFriendsEmail={this.state.chFriendsEmail} getChat={this.getChat} onClose={(e) => this.setState({ isOpen: false })} />
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