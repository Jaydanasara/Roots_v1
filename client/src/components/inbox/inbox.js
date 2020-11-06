import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { storage } from "../../config/firebase";
import moment from "moment";


class Inbox extends React.Component{
    constructor(props){
        super(props)
    this.state={

        allMessages:{}

        }
    }

componentDidMount(){
    this.getMessages()
}


getMessages=()=>{
    API.getAllMessages({user_id: this.props.userInfo.user_ID})
    
    .then(res => {
        this.setState({allMessages:res.data})
        console.log(res)
    })
    .then(()=>{
        console.log(this.state.allMessages)
    })

}



    render(){

        return(
        <div className ="messagesContainer">

            <div className = "messagesTitle"> <h2>Messages</h2></div>
            
             </div>

        )

    }
}


export default Inbox;