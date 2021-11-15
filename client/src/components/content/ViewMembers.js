import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import API2 from '../../utils/API2'
import "./viewMembers.css"
export default function ViewMembers(props) {
  const [members, setMembers] = useState([])
  const [groupInfo, setGroupInfo] = useState({})
  const [isBoss, setIsBoss] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminId,setAdminId]=useState([])
  const [owner,setOwner]=useState("")

  useEffect(() => {
    console.log(props)
    getGroupInfo()

  }, [])



  const ownerCheck = (owners, admins) => {
    const findOwner = owners.find(owner => owner.user_ID === props.userInfo.scrUser_id || owner.user_ID === props.userInfo.user_ID)

    if (findOwner !== undefined) {
      setIsBoss(true)
      setIsOwner(true)
      setOwner(findOwner.user_ID)
    } else if (findOwner === undefined) {
      setIsOwner(false)
      const findAdmin = admins.find(admin => admin.user_ID === props.userInfo.scrUser_id || admin.user_ID === props.userInfo.user_ID)
      if (findAdmin === undefined) {
        setIsBoss(false)
        setIsAdmin(false)
      } else {
        setIsBoss(true)
        setIsAdmin(true)
        
      }
    }
  }


  const getGroupInfo = async () => {
    let res = await API2.findGroupInfo({ _id: props.group_id })
    setMembers(res.data.members)
    setGroupInfo(res.data)
    ownerCheck(res.data.owners, res.data.admins)
    setAdmin(res.data.admins)
  }

  const deleteMember = async (id) => {
    let res = await API2.deleteMember(props.group_id, { _id: id })
    console.log(res.data)

    getGroupInfo()

  }

  const setAdmin=(admins)=>{
    if(admins.length>0){
    admins.forEach(admin=>{
      setAdminId(adminId=>[...adminId,admin.user_ID])
    })
  }else{
    setAdminId([])
  }

   
  }


  const makeAdmin = async (user_ID, userName, userPic) => {

    let res = await API2.makeAdmin(props.group_id, {
      user_ID: user_ID,
      userName: userName,
      userPic: userPic,
    })

    console.log(res)
    getGroupInfo()
  }


const removeAdmin = async (user_ID, userName, userPic) => {

    let res = await API2.removeAdmin(props.group_id, {
      user_ID: user_ID,
      userName: userName,
      userPic: userPic,
    })

    console.log(res)
    setAdmin(res.data.admins)
    getGroupInfo()
  }

  return (
    <div className="memContainer">
      <div className="headline"><h2>{groupInfo.groupName}</h2></div>

      <div className="tableDiv">
        <Table hover>
          <thead>
            <tr>
              <th><div className="membersList"><h4>Members</h4></div></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {members.length ? (

              members.map(content => {
                return (
                  <tr key={content._id}>
                    <td><img className="memberImage" src={(content.userPic !== undefined && content.userPic !== "") ? content.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Flogo_withbackground.png?alt=media&token=1e4ad528-38a5-4cc6-b9d4-1c5eb8eaa282"} alt="users pic" /></td>
                    <td><Link to={"/friendProfile/" + content.user_ID}>{content.userName}</Link></td>

                    {(isBoss === true) ? <td><input value="Delete" type="button" className="deleteMemButton" onClick={() => deleteMember(content._id)} /></td> : null}
                    {(isOwner === true && content.user_ID !==owner) ? <td> {(adminId.includes(content.user_ID))?<input value ="Remove Admin" type="button" className="removeAdminBtn"  onClick={() => removeAdmin(content.user_ID, content.userName, content.userPic)} /> :
                   <input value="Make Admin" type="button" className="adminMemButton" onClick={() => makeAdmin(content.user_ID, content.userName, content.userPic)} />}
                    </td> : <td></td>}

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
