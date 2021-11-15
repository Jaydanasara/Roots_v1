import React from "react";
import "../../components/layouts/roots.css";

import { auth } from "../../config/firebase"
import API from "../../utils/API";
import { Link, withRouter } from "react-router-dom";
import "./navbar.css";
import API2 from "../../utils/API2";


class Navbar extends React.Component {

    state = {
        isActive: false,
        Name: "",
        isLoading: false,
        search: "",
        allUsers: [],
        Users: "",
        reload: false,
        notifications:[],
        messagesOpen: false,
        notificationsOpen: false

    }


    componentDidMount() {
        console.log(this.props)
       

        this.getAllUsers()
        // let displayName = ""
        // if (this.props.whichName === true) {
        //     displayName = this.props.userInfo.firstname + " " + this.props.userInfo.lastname


        // }
        // else {
        //     displayName = this.props.userInfo.screenName
        // }
        // this.setState({ Name: displayName, isLoading: false })
    }



    getAllUsers = () => {
        
        API.getAllUsers()
            .then(res => {
                this.setState({ allUsers: res.data })
                console.log(res.data)

            })
    }

    accountClick = () => {

        this.setState({ isActive: !this.state.isActive })
    };


    onTextChanged = e => {
        this.setState({ Users: e.target.value })
    }


    searchSuggestions() {
        let suggestions = this.state.allUsers.filter((user) => {
            return user.firstname.toLowerCase().includes(this.state.Users.toLowerCase())



        })
        if (this.state.Users.length === 0) {
            return null;
        }
        return (
            <ul className="srch_resp_cont">
                {suggestions.map((item) => <li onClick={this.reloadFunc} className="searchResponse">  <Link to={"/friendProfile/" + item._id}><img className="search-Img" src={(item.userPic !== undefined && item.userPic !== "") ? item.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" />{item.firstname} {" "}{item.lastname} </Link> </li>)}
            </ul>
        )
    }


    openMessages = () => {
       
        if (this.state.messagesOpen === false) {
            this.setState({ messagesOpen: true })
        }
        else if (this.state.messagesOpen === true) {
            this.setState({ messagesOpen: false })
            this.props.removeAllInstMessages(this.props.userInfo.user_ID)
        }


    }


    openNotifications = () => {
       
        if (this.state.notificationsOpen === false) {
            this.setState({ notificationsOpen: true })
        }
        else if (this.state.notificationsOpen === true) {
            this.setState({ notificationsOpen: false })

        }
    }


    reloadFunc = () => {
        this.setState({ reload: !this.state.reload })
        window.location.reload(false);
    }

    logout = async () => {
        auth.signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });

        sessionStorage.clear();
    }


    showMessages = () => {
        let allMessages = this.props.instMessages
        console.log(allMessages)

        if (this.props.instMessages.length === 0) {
            return null;
        }

        if (this.state.messagesOpen === true) {

            return (
                <ul className="messageList">
                    {allMessages.map((each) => <li className="eachMeassage" ><img className="search-Img" src={(each.userPic !== undefined && each.userPic !== "") ? each.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" />{each.name} {" "} sent you a message</li>)}
                </ul>
            )
        }
    }


    showNotifications = () => {
        console.log(this.state.notifications)
        console.log(this.props.notifications)
        let allNotifications = this.props.notifications
       

        if (this.props.notifications.length === 0) {
            return null;
        }

        if (this.state.notificationsOpen === true) {

            return (
                <ul className="messageList">
                    {allNotifications.map((each) => (each. notificationType==="comment" || each. notificationType=== undefined) ?<li className="eachNotification" onClick={()=>this.viewNotiPost(each._id,each.post_id)}><img className="search-Img" src={(each.userPic !== undefined && each.userPic !== "") ? each.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" />{each.name} {" "} commented on your post: <div className="noteContent">"{(each.content.length > 20) ? each.content.substring(0, 20) : each.content}"</div></li> :
                     (each. notificationType==="groupInvite")?<li className="eachNotification" ><img className="search-Img" src={(each.userPic !== undefined && each.userPic !== "") ? each.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" /><div className="noteContent">{ each.content}</div> <div className="grpButtonDiv"><button className="accept" onClick={()=>this.addToGroup(each.user_id,each.name,each.receiver,each.receiverName,each._id)}>accept</button><button className="refuse" onClick={()=>this.props.removeNotification(each.receiver,each._id)}>refuse</button></div></li> :
                     <li className="eachNotification" onClick={()=>this.viewNotiPost(each._id,each.post_id)}><img className="search-Img" src={(each.userPic !== undefined && each.userPic !== "") ? each.userPic : "https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt="users pic" />{each.name} {" "} commented on your post:<div className="noteContent">{(each.content.length > 20) ? each.content.substring(0, 20) : each.content}</div></li>)}
                   
                
                    </ul> 
            )
        }

    }


    viewNotiPost = (comment_id,post_id)=>{
        console.log(comment_id +" " + post_id)

        this.props.viewNotiPost(post_id)

        this.props.removeNotification(this.props.userInfo.user_ID,comment_id)

        this.setState({notificationsOpen: false})
    }

    addToGroup=async(id,name,receiverId,receiverName,notif_id)=>{
      
         let res =await API.addGrpIdToMember(receiverId,{groupName:name, group_ID:id})
         console.log(res)

         let response = await API2.addMemToGrp({
             id: id, 
             groupMemID: receiverId,
            memName:receiverName,
            
            })
         console.log(response)
      
         this.props.removeNotification(receiverId,notif_id)
         this.openNotifications()

    }


    render() {


       
        console.log(this.props.instMessages)

        return (
            this.state.isLoading === true ? <div className="loading">Loading</div> :
                <div className="navigation">
                    <header>
                        <div className="headFstRow">
                            <div className="navSitePic">
                                <a href="/" className="">
                                    <img className="smScrnLogo" src="/logo500.png" alt="tree icon" />
                                </a>
                            </div>

                            <ul className="homeButton">

                                <li>
                                    <a id="home" href="/"> <i className="fa fa-home home"></i> Home </a>

                                </li>

                            </ul>


                            <div className={this.state.isActive ? "userAccount active" : "userAccount"} onClick={this.accountClick} >


                                <div className=" dropdown-toggle" id="userInfo"  >
                                    <i className="fa fa-user">  {this.props.userInfo.firstname + " " + this.props.userInfo.lastname}</i>
                                </div>
                                <div className="dropDown">
                                    <ul className="listContainer">
                                        <Link to={"/profile/" + this.props.userInfo.user_ID}><li className="dropdown-item"> Profile</li> </Link>

                                        <a className="dropdown-item" href="/landingPage" onClick={this.logout}>Logout</a>
                                    </ul>
                                    <div className="dropdown-divider"></div>

                                </div>

                            </div>


                        </div>

                    </header>

                    <div className="headSecRow">

                        <div className="hamburger">
                            <input type="checkbox" id="nav-toggle" className="nav-toggle" />

                            <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={this.props.drawerClickHandler} >
                                <span></span>
                            </label>
                        </div>

                        <div className="searchBox">
                            <input type="text" className="searchInfo" placeholder="Search" onChange={this.onTextChanged} />
                            <button id="searchButton" className="btn btn-outline-secondary" type="submit"><i id="searchIcon" className="fa fa-search"></i> </button>
                        </div>

                        <div className="navIcons">
                            <div className="bellNotifications" onClick={this.openNotifications}>
                                <i id="bell" className="fas fa-bell"></i>
                                <div className="notificationNumber">{(this.props.newNotifications > 0) ? this.props.newNotifications : null}</div>
                            </div>
                            <div className="commentNotifications" onClick={this.openMessages}>
                                <i id="note" className="fas fa-sticky-note"></i>
                                <div className="messageNumber">{(this.props.newMessages > 0) ? this.props.newMessages : null}</div>
                            </div>
                        </div>
                    
                    </div>

                    <div className={(this.state.messagesOpen === true) ? "instMessages" : "noMessages"} >
                            {this.showMessages()}

                        </div>

                        <div className={(this.state.notificationsOpen === true) ? "instMessages" : "noMessages"} >
                            {this.showNotifications()}

                        </div>
                        <div>{this.searchSuggestions()}</div>



                    {/* <div className="searchForm ">
                        <div className="searchBox">
                            <input type="text" className="searchInfo" placeholder="Search" onChange={this.onTextChanged} />

                            <button id="searchButton" className="btn btn-outline-secondary" type="submit"><i id="searchIcon" className="fa fa-search"></i> </button>
                            <div className="navIcons">
                                <div className="bellNotifications" onClick={this.openNotifications}>
                                    <i id="bell" className="fas fa-bell"></i>
                                    <div className="notificationNumber">{(this.props.newNotifications > 0) ? this.props.newNotifications : null}</div>
                                </div>
                                <div className="commentNotifications" onClick={this.openMessages}>
                                    <i id="note" className="fas fa-sticky-note"></i>
                                    <div className="notificationNumber">{(this.props.newMessages > 0) ? this.props.newMessages : null}</div>
                                </div>
                            </div>
                            <div className={(this.state.messagesOpen === true) ? "instMessages" : "noMessages"} >
                                {this.showMessages()}

                            </div>

                            <div className={(this.state.notificationsOpen === true) ? "instMessages" : "noMessages"} >
                                {this.showNotifications()}

                            </div>
                            <div>{this.searchSuggestions()}</div>
                        </div>



                        <ul className="newFeedLink">

                            <li>
                                <a className="home " href="/"> <i className="fa fa-home"></i> Home </a>

                            </li>

                        </ul>
                    </div> */}
                </div>





        )
    }
}
let NavbarWithRouter = withRouter(Navbar);

export default NavbarWithRouter;



