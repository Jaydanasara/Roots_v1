import React from "react";
import io from "socket.io-client";
import Peer from "simple-peer"
import { createRef } from "react";

// const socket = io()
// console.log(socket)
// const socketUrl = "http://localhost:3001"


class VideoChat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = createRef();
        this.state = {
            YourID: "",
            users: {},
            stream: null,
            receivingCall: false,
            caller: "",
            callerSignal: null,
            callAccepted: false,

        };
    }
    
    componentDidMount() {
       
        this.socket.current = io.connect("/");
        this.getVideo()

        this.socket.current.on("yourID", (id) => {
            console.log(id)
            this.setState({ YourID: id });
        })
        this.socket.current.on("allUsers", (users) => {
            console.log(users)
            this.setState({ users: users });
        })

        this.socket.current.on("hey", (data) => {
            console.log(data)
            this.setState({ receivingCall: true, caller: data.from, callerSignal: data.signal })

        })


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
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: this.state.stream,
        });

        peer.on("signal", data => {
            this.socket.current.emit("callUser", { userToCall: id, signalData: data, from: this.state.YourID })
        })

        peer.on("stream", stream => {
            let video = document.getElementById("recVid");
            video.srcObject = stream;
        });

        this.socket.current.on("callAccepted", signal => {
            this.setState({ callAccepted: true })
            peer.signal(signal);
        })

    }


    acceptCall = () => {
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

            this.socket.current.emit("acceptCall", { signal: data, to: this.state.caller })
        })

        peer.on("stream", stream => {
            console.log("3")
            let video = document.getElementById("recVid");
            video.srcObject = stream;
        });

        peer.signal(this.state.callerSignal);
    }



    // lstream = stream =>{

    //     let video = document.getElementById("senderVid")
    //     video.srcObject=stream;
    //     window.peer_stream =stream
    // }


    render() {

        let incomingCall;
        if (this.state.receivingCall) {
            incomingCall = (
                <div>
                    <h1>{this.state.caller} is calling you</h1>
                    <button onClick={this.acceptCall}>Accept</button>
                </div>
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
                <button className="disconnectChat" type="submit">end call</button>

                <div>
                    {Object.keys(this.state.users).map(key => {
                        if (key === !this.state.YourID) {
                            return null;
                        }
                        return (
                            <button onClick={() => this.callPeer(key)}>Call {key}</button>
                        );
                    })}
                </div>

                <div>
                    {incomingCall}
                </div>
            </div>



        )



    }



}

export default VideoChat;