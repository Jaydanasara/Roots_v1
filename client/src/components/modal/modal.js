import React from "react";
import API from "../../utils/API"

import { storage } from "../../config/firebase";
import SocketContext from "../../context/SocketProvider";





class Modal extends React.Component {
    static contextType = SocketContext

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            newChatInfo: [],
            image: null,
            url: "",
            vidUrl: "",
            isActive: false,
            isActive2: false,
            
        }

       

    }


    componentDidMount() {
        console.log(this.props.sender_id)
        console.log(this.props.chFriends_id)

        const socket = this.context



        socket.on('receive-message', (data) => {
            console.log(data)

            console.log("socket on modal")
            if (this.props.isOpen === true) {
                this.props.getChat()
            }
        })


    }

    async componentDidUpdate() {
        const scrollToBtm = await document.getElementById("messageScroll");
        if (scrollToBtm)
            scrollToBtm.scrollTo(0, scrollToBtm.scrollHeight)


    }






    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value })
    }



    sendChat = (e, id) => {
        const socket = this.context
        e.preventDefault()
        if (this.props.sender === this.props.userInfo.screenName) {
            const fullName = this.props.userInfo.screenName

            


            socket.emit('send-message', ({
                name: fullName, content: this.state.content, userPic: this.props.avatar,
                 id: this.props.sender._id, friends_id: this.props.chFriends_id,email: this.props.userInfo.emailaddress,
            }))
            API.logMessage(id, {
                content: this.state.content,
                sender: this.props.sender,
                receiverHasRead: false,
                picUrl: this.state.url,
                vidUrl: this.state.vidUrl
            })


                .then(res => {
                    this.setState({ content: "", isActive: false, isActive2: false }, () => this.props.getChat())

                    console.log(res)
                })
                .catch(err => console.log(err));
            
            this.props.getChat()


        }
        else {


            const fullName = this.props.userInfo.firstname + this.props.userInfo.lastname

            socket.emit("send-message", ({
                name: fullName, content: this.state.content, userPic: this.props.userInfo.userPic,
                email: this.props.userInfo.emailaddress, id: this.props.userInfo.user_ID, friends_id: this.props.chFriends_id
            }))
            API.logMessage(id, {
                content: this.state.content,
                sender: this.props.sender,
                receiverHasRead: false,
                picUrl: this.state.url,
                vidUrl: this.state.vidUrl
            })


                .then(res => {
                    this.setState({ content: "", isActive: false, isActive2: false }, () => this.props.getChat())

                    console.log(res)
                })
                .catch(err => console.log(err));
            
            this.props.getChat()
           

        }
    }


    handleImageSelected = event => {

        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
            this.uploadClick()
        }

    }

    handleImageSelected2 = event => {

        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
            this.uploadClick2()
        }

    }

    handleUpload = () => {
        const fullName = this.props.fullName;
        const { image } = this.state;
        const uploadTask = storage.ref(fullName + "/" + image.name).put(image);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress: progress })
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref(fullName).child(image.name).getDownloadURL()
                    .then(url => {
                        console.log(image.name)
                        if (image.name.substring(image.name.length - 3, image.name.length) === "mp4") {

                            this.setState({ vidUrl: url });
                        }
                        else {
                            this.setState({ url: url });
                        }
                        console.log(this.state.vidUrl)
                    })
            });
    }

    uploadClick = () => {

        this.setState({ isActive: !this.state.isActive })
    };

    uploadClick2 = () => {

        this.setState({ isActive2: !this.state.isActive })
    };




    render() {






        return (
            !this.props.isOpen ?
                <div></div>
                :



                <div className="modalContainer ">








                    <div className="modalContainer">
                        <div className="messageDisplay" id="messageScroll"  >
                            <div className="modalHeader">
                                <div className="chatFriendName" >{this.props.chFriendsName} <button className="close" onClick={this.props.onClose}>X</button></div>
                            </div>


                            {this.props.allChatInfo.map(chats => {

                                return (

                                    <div key={chats._id}>






                                        <div>
                                            {

                                                (chats.messages.length == null) ?
                                                    <div className="mapMesages">test</div> :

                                                    <div className="mapMesages">


                                                        {
                                                            chats.messages.map((message) =>
                                                                <div className="messageContainer" >
                                                                    <div >
                                                                        <div className={`${(message.sender === this.props.sender) ? "sender" : "otherSender"}`}>  {message.sender} </div>
                                                                        <div className={`${(message.sender === this.props.sender) ? "theMessage" : "otherMessage"}`}><p>{message.content}</p> </div>
                                                                        {
                                                                            (message.picUrl === "") ? null : <div className="modalPic"><img className="messagePic" src={message.picUrl} alt="messagePic" /></div>

                                                                        }

                                                                        {
                                                                            (message.vidUrl === "") ? null : <div className="modalVideo"> <video className="messageVideo" src={message.vidUrl} type="video/mp4" controls></video> </div>
                                                                        }
                                                                    </div>
                                                                </div>

                                                            )}


                                                    </div>

                                            }

                                        </div>


                                    </div>

                                );
                            })
                            }
                        </div>
                    </div>




                    <div className={this.state.isActive || this.state.isActive2 ? "fileInputContainer" : null}>

                        <div className={this.state.isActive ? "imgInputActive" : "imgInactive"}>

                            <div>
                                <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected} ref={fileInput => this.fileInput = fileInput} />
                                <img className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="previewUpload" src={this.state.url} alt="preview" height="50" width="50" />
                            </div>

                            <div>
                                <progress className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="progress" value={this.state.progress} max="100" />
                                <button className={this.state.isActive ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                                <span className={this.state.isActive ? "uploadReady active" : "uploadReady"} id="file"> </span>
                            </div>

                        </div>


                        <div className={this.state.isActive2 ? "vidInputActive" : "vidInactive"}>

                            <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected2} ref={fileInput => this.fileInput2 = fileInput} />
                            <video className={this.state.isActive2 ? "uploadReady active" : "uploadReady"} id="previewUpload" src={this.state.vidUrl} alt="preview" height="40" width="50"  ></video>

                            <progress className={this.state.isActive2 ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                            <button className={this.state.isActive2 ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                            <span className={this.state.isActive2 ? "uploadReady active" : "uploadReady"}></span>
                        </div>


                    </div>



                    <div className="messageSection">


                        <div ><textarea name="content" value={this.state.content} onChange={this.handleChange} className="textMessage" placeholder="type your message here"></textarea></div>
                    </div>

                    <div className="messageBtnDiv">

                        <button type="submit" className="messageBtn" onClick={(e) => this.sendChat(e, this.props.messageID)}>  send    </button>
                        <div className="attachFile">
                            <button type="button" className="attachPhotoBtn" onClick={() => this.fileInput.click()}> <i class="fa fa-file-image" aria-hidden="true"></i>  </button>
                        </div>

                        <div className="attachVideoFile">
                            <button type="button" className="attachVideoBtn" onClick={() => this.fileInput2.click()}><i class="fa fa-file-video"></i> </button>
                        </div>

                        <div className="callFriend"> <button onClick={() => this.props.callAFriend(this.props.chFriends_id)}><i class="fas fa-video"></i> <i class="fa fa-phone" aria-hidden="true"></i></button></div>


                    </div>


                </div>


        )
    }





}


export default Modal;