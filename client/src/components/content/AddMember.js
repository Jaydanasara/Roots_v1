
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import API from '../../utils/API'
import API2 from '../../utils/API2'

import "./addMember.css"
import e from 'cors'


export default function AddMember(props) {
  
  useEffect(() => {
    getGroupInfo()
    listUsersFriends()
  }, [])

  console.log(props.info.match.params.id)


  const [friendsInfo, setFriendsInfo] = useState([])
  const [groupInfo,setGroupInfo]=useState([])
  const[text, setText]=useState("Add")

  const listUsersFriends = () => {

    API.getFriendsList({ friends: props.userInfo.friends })

      .then(res => {

        setFriendsInfo(res.data)
      })

      .catch(err => console.log(err));
  }


 const getGroupInfo= async()=>{
    let res = await API2.findGroupInfo({_id:props.info.match.params.id})
  
    setGroupInfo(res.data)
  }


  const inviteSent=(e)=>{
    e.target.value="sent"
    e.currentTarget.disabled=true
  }

 const saveGroupNotification = (id,receiverFirstName,receiverLastName,receivePic,e) => {
        const receiverName=receiverFirstName+" "+receiverLastName
    inviteSent(e)
   
    API.saveNotification(id, {
        name: groupInfo.groupName,
        user_id: groupInfo._id,
        userPic: groupInfo.grpLogoPic,
        content:groupInfo.groupName +"invited you to Join",
        receiver:id,
        receiverName:receiverName,
        receiverPic:receivePic,
        notificationType:"groupInvite"
        
    })

        .then(res => {

            
            console.log(res)
           const socket =props.socket
            
    socket.emit('send-notification', ({
        notifications:res.data,
         id:id, friends_id:groupInfo._id
    }))

        })

        .catch(err => console.log(err));
}



  console.log(groupInfo)

  return (
    <div className="addMemContainer">
      <div className="headline"><h3>Invite your Friends to join the group</h3></div>

      <div className="tableDiv">
        <Table hover>
          <thead>
            <tr>
              <th>Friends</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {friendsInfo.length ? (
              
                friendsInfo.map(content => {
                  return (
                    <tr key={content._id}>
                      <td><img className="memberImage" src={(content.userPic !== undefined && content.userPic !== "") ? content.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users pic"/></td>
                      <td><Link to={"/friendProfile/"+ content._id}>{content.firstname+" "+content.lastname}</Link></td>
                     
                      <td><input value = "add" type="button" className="addMemButton"  onClick={(e)=>saveGroupNotification(content._id,content.firstname,content.lastname,content.userPic,e)}/></td>
                    </tr>
                  )
                })
              
            ) : (

              <tr></tr>
            )

            }


          </tbody>
        </Table>



      </div>

    </div>
  )
}
