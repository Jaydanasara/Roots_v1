import React, { useState,useEffect, } from 'react'

import Card from "react-bootstrap/Card";
import API from '../../utils/API';
import API2 from '../../utils/API2';
import "./joinButton.css"


export default function JoinButton(props) {

    

    const [joinAs, setJoinAS] = useState(props.userInfo.firstname + " " + props.userInfo.lastname)
    const [isPrivate, setIsPrivate] = useState(false)
    const [status,setStatus]= useState("Join")
    const [hasRequested,setHasRequested]=useState(false)
   const [disableButton,setDisableButton]=useState(false)
  


    useEffect(() => {
     
    checkIfReq()

    }, [props.notifications])

const checkIfReq=()=>{
    
   for(let i =0; i <props.notifications.length;i++){
   
    if(props.notifications[i].user_id===props.userInfo.user_ID || props.notifications[i].user_id === props.userInfo.scrUser_id){
        setStatus("Sent")
        setHasRequested(true)
        break;
        
    }
   }
      
    
}

    const privacyCheck = (e) => {
        if (props.groupPrivacy === "public") {
            joinGroupApi()
        }
        else {
            reqToJoin(e)
            setIsPrivate(true)
        }

    }



    const joinGroupApi = async (e) => {
        setStatus("added")
        setDisableButton(true)
        let userName
        let user_ID
        if (joinAs === props.userInfo.firstname + " " + props.userInfo.lastname) {
            userName = props.userInfo.firstname + " " + props.userInfo.lastname
            user_ID = props.userInfo.user_ID
        } else {
            userName = props.userInfo.screenName
            user_ID = props.userInfo.scrUser_id
        }

        let res = await API.addGrpIdToMember(user_ID, { groupName: props.groupName, group_ID: props.group_id })
        

        let response = await API2.addMemToGrp({
            id: props.group_id,
            groupMemID: user_ID,
            memName: userName

        })

        
       window.location.reload(true)
       

    }



    const reqToJoin = (e) => {
        setStatus("Sent")
        setDisableButton(true)
        let userName
        let user_ID
        let userPic
        if (joinAs === props.userInfo.firstname + " " + props.userInfo.lastname) {
            userName = props.userInfo.firstname + " " + props.userInfo.lastname
            user_ID = props.userInfo.user_ID
            userPic = props.userInfo.userPic
        } else {
            userName = props.userInfo.screenName
            user_ID = props.userInfo.scrUser_id
            userPic = props.screenInfo.userPic
        }


        // inviteSent(e)

        API2.saveGrpNotification(props.group_id, {
            name: userName,
            user_id: user_ID,
            userPic: userPic,
            content: userName + " would like to Join " + props.groupName,
            receiver: props.group_id,
            receiverName: props.groupName,
            notificationType: "groupInvite"

        })

            .then(res => {

               
                
                const socket = props.socket

                socket.emit('send-grpNotification', ({
                    notifications: res.data,
                    id: props.owners_id, friends_id: props.group_id
                }))

            })

            .catch(err => console.log(err));
    }



    return (
        <div>

            <div className="">
                <Card >
                    <Card.Img variant="top" src="/groups2.png" style={{ maxHeight: '8rem', maxWidth: "50% " }} />
                    <Card.Body>
                        <Card.Title>
                            <div className="groupNameContainer">
                                <h2 className="groupName">{props.groupName}</h2>
                            </div>
                        </Card.Title>
                    </Card.Body>
                </Card>

            </div>
            <div className="messageWrapper">
                <div className="privacyMessage">  {(isPrivate === true) ? <h4>This group is either Private or Secret therefore your request to join was sent to the Owner</h4> :
                    null}</div>
            <div className="privacyMessage">  {(hasRequested === true) ? <h4>You have already requested to join this group please be patient while the owner get back to you.</h4> :
                    null}</div>

                <div className="messageDiv">
                    <p className="message"> You are not a member of {props.groupName}. if you would like to be come a member of {props.groupName} click Join</p>
                </div>

            </div>

            <div className="joinWrapper">
                <h3>You can join the group as:</h3>
                <div className="radioDiv">

                    <label className="radioLabel">
                        <input className="radio" type="radio" checked={joinAs === props.userInfo.firstname + " " + props.userInfo.lastname}
                            value={props.userInfo.firstname + " " + props.userInfo.lastname} onChange={(e) => { setJoinAS(e.target.value) }} />
                    </label>
                    <label className="names"> {props.userInfo.firstname + " " + props.userInfo.lastname}</label>
                    <h4>or </h4>

                    <label className="radioLabel">
                        <input className="radio" type="radio" checked={joinAs === props.userInfo.screenName} value={props.userInfo.screenName}
                            onChange={(e) => { setJoinAS(e.target.value) }} />
                    </label>
                    <label className="names" > {props.userInfo.screenName}</label>
                </div>
                <div className="buttonWrapper">
                    <input className="butt" type="button" disabled={(disableButton===true)?true:false} value={status} onClick={(e) => privacyCheck(e)} />
                </div>

            </div>
        </div>


    )
}
