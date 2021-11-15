
import React, { useState } from 'react'
import { Form, Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';

import API2 from '../../utils/API2';
import "./createGroup.css"
import { useHistory } from "react-router-dom"
import { set } from 'mongoose';
export default function CreateGroup(props) {

    const history = useHistory()


    const [values, setValues] = useState({
        groupName: "",
        groupDescription: "",
        groupType: "",
        groupPrivacy: "",


    })

    const [message, setMessage] = useState("");
    const [createAs, setCreateAS] = useState(props.userInfo.firstname + " " + props.userInfo.lastname)

    const setPrivacy = (e) => {
        console.log(props)
        setValues({ ...values, groupPrivacy: e.target.value })

    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }



    const createGroup = (e) => {
        e.preventDefault()
        if (validation() === false) {
            setMessage("all field must be completed")
        } else {
            createGroupApi();
        }
    }


    const validation = () => {

        let isValid = true;
        Object.keys(values).forEach(key => {
            if (values[key].length === 0) {

                isValid = false
                return isValid

            }
        });

        return isValid
    }

    const createGroupApi = () => {
        let userName
        let user_ID
        if (createAs === props.userInfo.firstname + " " + props.userInfo.lastname) {
            userName = props.userInfo.firstname + " " + props.userInfo.lastname
            user_ID = props.userInfo.user_ID
        } else {
            userName = props.userInfo.screenName
            user_ID = props.userInfo.scrUser_id

        }



        API2.createGroup({
            owners: [{
                userName: userName,
                user_ID: user_ID
            }],
            groupName: values.groupName,
            groupType: values.groupType,
            groupPrivacy: values.groupPrivacy,
            groupDescription: values.groupDescription,
            grpLogoPic: "",
            members: [{
                userName: userName,
                user_ID: user_ID

            }]

        })
            .then(res => {
                addGroupID(props.userInfo.user_ID, res.data._id)

                console.log(res)
                if (res.status === 200) {
                    const id = res.data._id

                    history.push('/theGroup/' + id)
                }


            })

            .catch(err => console.log(err))
    }

    const addGroupID = (user_Id, group_ID) => {
        API2.addGroupID({
            user_ID: user_Id,
            group_ID: group_ID
        })
            .then(res => {
                console.log(res)
            })

            .catch(err => console.log(err))
    }





    return (
        <div>
            <h1>Create Group</h1>
            <Form className="m-3 " style={{ width: "25rem" }} onSubmit={createGroup}>
                <div><h3>Create group as</h3></div>

                <div className="radioDiv">

                    <label class="radioLabel">
                        <input className="radio" type="radio" checked={createAs === props.userInfo.firstname + " " + props.userInfo.lastname}
                            value={props.userInfo.firstname + " " + props.userInfo.lastname} onChange={(e) => { setCreateAS(e.target.value) }} />
                    </label>
                    <label className="names"> {props.userInfo.firstname + " " + props.userInfo.lastname}</label>
                    <h4>or </h4>

                    <label class="radioLabel">
                        <input className="radio" type="radio" checked={createAs === props.userInfo.screenName} value={props.userInfo.screenName}
                            onChange={(e) => { setCreateAS(e.target.value) }} />
                    </label>
                    <label className="names" > {props.userInfo.screenName}</label>
                </div>





                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label > <strong> Group Name </strong> </Form.Label>
                    <Form.Control name="groupName" value={values.groupName} onChange={handleChange} type="text" placeholder="Enter group name" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><strong> Type of Group </strong> </Form.Label>
                    <Form.Control name="groupType" value={values.groupType} onChange={handleChange} type="text" placeholder="Enter the type of group" />

                </Form.Group>
                <DropdownButton id="dropdown-item-button" title={"Group Privacy:   " + values.groupPrivacy}>

                    <Dropdown.Item as="button" type="button" onClick={setPrivacy} name="public" value="public" >public</Dropdown.Item>
                    <Dropdown.Item as="button" type="button" name="private" onClick={setPrivacy} value="private">private</Dropdown.Item>
                    <Dropdown.Item as="button" type="button" name="exclusive" onClick={setPrivacy} value="exclusive">exclusive</Dropdown.Item>
                </DropdownButton>

                <Form.Group className="mt-4 mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><strong>Group Description</strong></Form.Label>
                    <Form.Control as="textarea" rows={3} name="groupDescription" value={values.groupDescription} onChange={handleChange} />
                </Form.Group>

                <div className="errorMessage m-3">{message}</div>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>


        </div>
    )
}





// groupName:{type:String,required:true},
//     groupType:{type:String,required:true},
//     groupPrivacy:{type:String,required:true},
// owners: [],
// admins:[{
//     userName:{type:String,required:false},
//     userPic:{type:String,required:false},
//     dateJoined:{ type: Date,default: Date.now },
//     addBy:{type:String}
// }],
// members:[{
//     userName:{type:String,required:false},
//     userPic:{type:String,required:false},
//     dateJoined:{ type: Date,default: Date.now },
//     addBy:{type:String}
// }],
// dateCreated:{ type: Date,default: Date.now },
// grpLogoPic:{type:String,required:false},
// groupPics:[],
// post: [{
//     type: Schema.Types.ObjectId,
//     ref: "postData"
//   }],
//   events:[]