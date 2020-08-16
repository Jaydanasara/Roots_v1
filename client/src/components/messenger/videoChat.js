import React from "react";
import socketIOClient from "socket.io-client";
import Peer from "simple-peer"
import{socket} from "../layouts/layout"
import friendProfileLayout from "../layouts/friendProfileLayout";
// import { createRef } from "react";

// const socket = io()
// console.log(socket)
// const socketUrl = "http://localhost:3001"
let phoneRinging = new Audio("./phoneRing.mp3")

class VideoChat extends React.Component {
    constructor(props) {
        super(props);
        // this.socket = createRef();
        this.state = {
            yourInfo:this.props.yourInfo,
            users:this.props.users,
            stream: null,
            receivingCall: this.props.receivingCall,
            caller:this.props.caller,
            callerSignal: this.props.callerSignal,
            callAccepted: false,
            btnHidden:false
 
        };
    }
    
    componentDidMount() {
        
         
       
        // this.socket.current =socketIOClient("/");
          this.getVideo()
        // this.socket.current.emit("join-room",this.props.userInfo.userInfo.firstname, this.props.userInfo.userInfo.user_ID)
       
       
        // this.socket.current.on("yourinfo", (info) => {
        //     console.log(info)
        //     this.setState({ yourInfo: info });
        // })
        // this.socket.current.on("allUsers", (users) => {
        //     console.log(users)
        //     this.setState({ users: users });
        // })

        // this.socket.current.on("hey", (data) => {
        //     console.log("hey front end ")
        //     this.setState({ receivingCall: true, caller: data.from, callerSignal: data.signal })

        // })

        // this.socket.current.on("user-disconnect", (usersid) => {
        //     console.log(usersid )
           
        //   })


    }

    getVideo = () => {

        const contraints = {
            audio: true,
            video: true
        }
        navigator.mediaDevices.getUserMedia(contraints)

            .then(stream => {

                console.log(stream)


                let video = document.getElementById("senderVid");
                video.srcObject = stream;

                this.setState({stream:stream})
            })

            .catch(function (err) {
                console.log(err, alert("cannot access your camera"))
            });

            

    }










    callPeer = (id) => {
    //    this.phoneRingFn()
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: this.state.stream,
            
        });
        console.log(peer)

        peer.on("signal", data => {
        
            socket.emit("callUser", { userToCall: id, signalData: data, from: this.state.yourInfo })
            console.log("call placed")
        })

        peer.on("stream", stream => {
            let video = document.getElementById("recVid");
            video.srcObject = stream;
        });

        socket.on("callAccepted", signal => {
            this.setState({ callAccepted: true })
            phoneRinging.pause()
            phoneRinging.currentTime = 0;
            peer.signal(signal);
        })


    }


    acceptCall = () => {
        // phoneRinging.pause()
        // phoneRinging.currentTime = 0;
        this.setState({ callAccepted: true })
        console.log("1")
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: this.state.stream,
        });
        peer.on("signal", data => {
            console.log("2")
            console.log(this.state.caller)

            socket.emit("acceptCall", { signal: data, to: this.state.caller.socketId })
        })

        peer.on("stream", stream => {
            console.log("3")
            let video = document.getElementById("recVid");
            video.srcObject = stream;
        });

        peer.signal(this.state.callerSignal);
        this.setState({btnHidden:true})

        
        
    }

    hangUp =()=>{
        this.props.callEnded()
            
     
            document.getElementById("recVid").remove()
         
    }

phoneRingFn =()=>{
   
    phoneRinging.play()
    console.log("phone ringing ")
    let timesPhnRung=0
    let MaxRings=3

    phoneRinging.onplay = function() {
        //played counter
        timesPhnRung++;
      };
      
      phoneRinging.addEventListener("ended", function() {
      
        phoneRinging.currentTime = 0;
        if (timesPhnRung < MaxRings) {
          phoneRinging.play();
        } else {
          timesPhnRung = 0;
         
        }
      });
      
    
   
}
    // peer.on("close",()=>{
    //     console.log("peerdestroy")
    //     document.getElementById("recVid").remove()
    //     peer.destroy();
      
    //   })


    render() {
        console.log(this.state.btnHidden)
        console.log(this.props)

        let incomingCall;
        if (this.state.receivingCall) {
            incomingCall = ( (this.state.btnHidden===false)?
                <div>
                    <h1>{this.state.caller.name} is calling you</h1>
                    <button onClick={this.acceptCall}>Accept</button>
                </div>:
                <div><h1>call connected</h1></div>
            )
        }
        return (
            <div className="videoChatContainer">
                <div className="videoWindows">
                    <div className="senderVidContainer">
                        sender
               <video id="senderVid" className="senderVideo" autoPlay="autoplay" muted></video>
                    </div>
                    <div className="receiverVidContainer">
                        receiver
               <video id="recVid" className="receiverVideo" autoPlay="autoplay"></video>
                    </div>
                </div>
                <button className="disconnectChat" onClick={()=>this.hangUp()}>end call</button>

                <div>{ 
                    this.state.users.length?(

                        <div>{
                          this.state.users.map(identify =>
                       
                        (identify.userid === this.props.friendsPhId)?
                            
                                  <button onClick={() => this.callPeer(identify.socketId)}>Call {identify.name}</button>
                              
                        :null 
                    )}
                    </div>
                    ):(<h1>Loading</h1>)}
                </div>

                <div>
                    {incomingCall}
                </div>
            </div>



        )



    }



}

export default VideoChat;