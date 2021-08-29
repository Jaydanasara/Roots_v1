import React from "react";
import { TokenInstance } from "twilio/lib/rest/api/v2010/account/token";


import SocketContext from "../../context/SocketProvider";




let phoneRinging = new Audio("./phoneRing.mp3")


class VideoChat extends React.Component {

    static contextType = SocketContext
    constructor(props) {
        super(props);
        this.handleICECandidateEvent=this.handleICECandidateEvent.bind(this)
         this.peerRef= React.createRef();
         this.otherIdRef=React.createRef()
         
        this.state = {
            yourInfo: this.props.yourInfo,
            users: this.props.users,
            stream: null,
            receivingCall: this.props.receivingCall,
            caller: this.props.caller,
            callerSignal: this.props.callerSignal,
            callAccepted: false,
            btnHidden: false,
            otherId:"",
            token:null

        };
    }

    componentDidMount() {
      
        const socket = this.context
        this.getVideo()
        console.log(this.props.caller)
        if (this.state.receivingCall===true){  
            this.setState({otherId :this.props.caller})        }
        else{
            this.setOtherUser(this.state.users)
        }

        socket.on('token', data=>{
            console.log(data)
            this.setState({token:data})
             
          });
          socket.emit('token');
        

    }


    setOtherUser=(users)=>{
        users.forEach(user=>{if (user.userid===this.props.friendsPhId){
            this.setState({otherId :user.socketId}) 

           console.log(this.state.otherId)

        }
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

                this.setState({ stream: stream })
            })

            .catch(function (err) {
                console.log(err, alert("cannot access your camera"))
            });



    }

  

    callPeer = (id) => {
        
      
       
        const socket = this.context

        
        //    this.phoneRingFn()
        
        
        this.peerRef.current = this.createPeer(id);
        this.state.stream.getTracks().forEach(track=>this.peerRef.current.addTrack(track,this.state.stream))
    

        // peer.on("signal", data => {

        //     socket.emit("callUser", { userToCall: id, signalData: data, from: this.state.yourInfo })
        //     console.log("call placed")
        // })

        // peer.on("stream", stream => {
        //     let video = document.getElementById("recVid");
        //     video.srcObject = stream;
        // });

        socket.on("callAccepted", data => {
            socket.on("ice-candidate",data =>{
                this.handleNewICECandiddateMsg(data)
            })
            this.setState({ callAccepted: true })
            phoneRinging.pause()
            phoneRinging.currentTime = 0;
            this.handleAnswer(data)
        })


    }

    createPeer =(id)=>{
        const peer = new RTCPeerConnection({
            iceServers:this.state.token.iceServers
        })

        peer.onicecandidate= this.handleICECandidateEvent;
        peer.ontrack = this.handleTrackEvent;
        peer.onnegotiationneeded =()=>this.handleNegotiationNeededEvent(id);

        console.log(peer)

        return peer;
    }


    handleNegotiationNeededEvent(id){
        const socket = this.context
        this.peerRef.current.createOffer().then(offer=>{
            return this.peerRef.current.setLocalDescription(offer);
        }).then(()=>{
            const data ={
                userToCall:id,
                caller:this.state.yourInfo.socketId,
                sdp:this.peerRef.current.localDescription
            };
            socket.emit("callUser", data);

        }).catch(e=>console.log(e));

    }


    acceptCall = () => {
        
        const socket = this.context
        // phoneRinging.pause()
        // phoneRinging.currentTime = 0;
        this.setState({ callAccepted: true })
        this.handleRecieveCall(this.props.incomingData)
        console.log("1")
        // const peer = new Peer({
        //     initiator: false,
        //     config:{iceServers: [{urls: 'stun:stun.l.google.com 19302'}, {urls: 'stun:global.stun.twillo.com:3478?transport=udp'}]}, 
        //     trickle: false,
        //     stream: this.state.stream,
        // });
        // peer.on("signal", data => {
        //     console.log("2")
        //     console.log(this.state.caller)

        //     socket.emit("acceptCall", { signal: data, to: this.state.caller.socketId })
        // })

        // peer.on("stream", stream => {
        //     console.log("3")
        //     let video = document.getElementById("recVid");
        //     video.srcObject = stream;
        // });

        // peer.signal(this.state.callerSignal);
        socket.on("ice-candidate",data =>{
            this.handleNewICECandiddateMsg(data)
        })
        this.setState({ btnHidden: true })

    }

    handleRecieveCall=(incoming)=>{
        const socket = this.context
        this.peerRef.current = this.createPeer();
        console.log(this.peerRef.current)
        const desc = new RTCSessionDescription(incoming.sdp);
        this.peerRef.current.setRemoteDescription(desc).then(()=>{
            this.state.stream.getTracks().forEach(track => this.peerRef.current.addTrack(track,this.state.stream));
        }).then(()=>{
            return this.peerRef.current.createAnswer();
        }).then(answer =>{
            return this.peerRef.current.setLocalDescription(answer);
        }).then(()=>{
            const data ={
                target:incoming.caller,
                caller:this.state.yourInfo.socketId,
                sdp:this.peerRef.current.localDescription

            }
            socket.emit("acceptCall", data)
        })
    }

    handleAnswer=(message)=>{
        const desc =  new RTCSessionDescription(message.sdp);
        this.peerRef.current.setRemoteDescription(desc)

        .catch(err=>console.log(err));  

    }

     handleICECandidateEvent(e){
      
        const socket = this.context
        console.log(this.state.otherId)
        if(e.candidate) {
            const payload = {
                target:this.state.otherId,
                candidate: JSON.stringify(e.candidate)
            }
            socket.emit("ice-candidate",payload)

        }
    

    }

    handleNewICECandiddateMsg=(incoming)=>{
       
        const candidate = new RTCIceCandidate(JSON.parse(incoming));
        console.log(this.peerRef.current)
        console.log(candidate)
       
        this.peerRef.current.addIceCandidate(candidate)
        .catch(e => console.log(e));


    }

    handleTrackEvent(e){
        let video = document.getElementById("recVid")
            video.srcObject = e.streams[0];
    }

    hangUp = () => {
        this.props.callEnded()


        document.getElementById("recVid").remove()

    }

    phoneRingFn = () => {

        phoneRinging.play()
        console.log("phone ringing ")
        let timesPhnRung = 0
        let MaxRings = 3

        phoneRinging.onplay = function () {
            //played counter
            timesPhnRung++;
        };

        phoneRinging.addEventListener("ended", function () {

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
            incomingCall = ((this.state.btnHidden === false) ?
                <div>
                    <h1>{this.state.caller.name} is calling you</h1>
                    <button onClick={this.acceptCall}>Accept</button>
                </div> :
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
                <button className="disconnectChat" onClick={() => this.hangUp()}>end call</button>
                { !this.state.receivingCall ? (
                    <div>{
                        this.state.users.length ? (

                            <div>{
                                this.state.users.map(identify =>

                                    (identify.userid === this.props.friendsPhId) ?
                                       
                                        <button className="callButton" onClick={() => this.callPeer(identify.socketId)}>Call {identify.name}</button>

                                        : null
                                )}
                            </div>
                        ) : (<h1>Loading</h1>)}
                    </div>
                ) : (<div></div>)}
                <div>
                    {incomingCall}
                </div>
            </div>



        )



    }



}

export default VideoChat;