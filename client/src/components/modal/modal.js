import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import { storage } from "../../config/fire";
import io from 'socket.io-client';
const socket = io()
console.log(socket)
const socketUrl = "http://localhost:3001"
class Modal extends React.Component {


    state = {
        content: "",
        newChatInfo: []
    }



    

    componentDidMount(){
        this.initSocket()
    }

    async componentDidUpdate() {
        const scrollToBtm = await document.getElementById("messageScroll");
        if (scrollToBtm)
            scrollToBtm.scrollTo(0, scrollToBtm.scrollHeight)


    }



	initSocket = ()=>{

		const socket = io(socketUrl)



		socket.on('connect', ()=>{

			console.log("Connected");

		})
        this.setState({socket})


        

		

	}



    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value })
    }



    sendChat = (id) => {
        socket.emit("message",this.state.content)
        API.logMessage(id, {
            content: this.state.content,
            sender: this.props.userInfo.firstname,
            receiverHasRead: false
        })

            .then(res => {
                this.setState({ content: "" }, () => this.props.getChat())

                console.log(res)
            })
            .catch(err => console.log(err));
            socket.on('message', (data) => {
                console.log(data);
                this.props.getChat()
              })
    }





    render() {




        console.log(this.props.userInfo.firstname)

        return (
            !this.props.isOpen ?
                <div></div>
                :

                this.props.allChatInfo.length === 0 ?
                    <div></div>
                    :

                    this.state.newChatInfo.length === 0 ?

                        <div className="modalContainer ">








                            <div className="modalContainer">
                                {this.props.allChatInfo.map(chats => {

                                    return (

                                        <div>


                                            <div className="messageDisplay" id="messageScroll"  key={chats._id} >
                                                <div className="modalHeader">
                                                    <div className="chatFriendName" >{chats.usersFirstNames} <button className="close" onClick={this.props.onClose}>X</button></div>
                                                </div>


                                                <div>


                                                    <div className="mapMesages">{
                                                        chats.messages.map((message) =>
                                                            <div className="messageContainer" id>
                                                                <div >
                                                                    <div className={`${(message.sender === this.props.userInfo.firstname) ? "sender" : "otherSender"}`}>  {message.sender} </div>
                                                                    <div className={`${(message.sender === this.props.userInfo.firstname) ? "theMessage" : "otherMessage"}`}><p>{message.content}</p> </div>

                                                                </div>
                                                            </div>

                                                        )}


                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    );
                                })
                                }
                            </div>








                            <div className="messageSection">


                                <div ><textarea name="content" value={this.state.content} onChange={this.handleChange} className="textMessage" placeholder="type your message here"></textarea></div>
                            </div>

                            <div className="messageBtnDiv">

                                <button type="submit" className="messageBtn" onClick={() => this.sendChat(this.props.messageID)}>  send    </button>

                            </div>

                        </div>
                        :
                        <div></div>

        )
    }





}


export default Modal;