import React from "react";
import "../../components/layouts/roots.css";

import { auth } from "../../config/firebase"
import API from "../../utils/API";
import { Link,withRouter } from "react-router-dom";



class Navbar extends React.Component {

    state = {
        isActive: false,
        Name: "",
        isLoading: false,
        search: "",
        allUsers: [],
        Users: "",
        reload: false,
       
        messagesOpen:false

    }

        ;
    componentDidMount() {
     
        this.getAllUsers()
        let displayName = ""
        if (this.props.whichName === true) {
            displayName = this.props.userInfo.firstname + " " + this.props.userInfo.lastname


        }
        else {
            displayName = this.props.userInfo.screenName
        }
        this.setState({ Name: displayName, isLoading: false })
    }



    getAllUsers = () => {
        console.log("hit")
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
                {suggestions.map((item) => <li onClick={this.reloadFunc} className="searchResponse">  <Link to={"/friendProfile/" + item._id}><img className="search-Img" src={(item.userPic!==undefined && item.userPic!=="")? item.userPic :"https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt ="users pic"/>{item.firstname} {" "}{item.lastname} </Link> </li>)}
            </ul>
        )
    }


    openMessages =()=>{
        console.log(this.state.messagesOpen)
        if(this.state.messagesOpen===false){
            this.setState({messagesOpen:true})
        }
        else if(this.state.messagesOpen===true){
            this.setState({messagesOpen:false})
            this.props.removeAllInstMessages(this.props.userInfo.user_ID)
        }

       
    }


    reloadFunc = () => {
        this.setState({ reload: !this.state.reload })
        window.location.reload(false);
    }

    logout= async ()=> {
        auth.signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });

        sessionStorage.clear();
    }


    showMessages =()=>{
        let allMessages = this.props.instMessages
        console.log(allMessages)

        if (this.props.instMessages.length === 0) {
            return null;
        }

        if(this.state.messagesOpen===true){
        
        return (
            <ul className="messageList">
                {allMessages.map((each) => <li className="eachMeassage"><img className="search-Img" src={(each.userPic!==undefined && each.userPic!=="" )? each.userPic :"https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802"} alt ="users pic"/>{each.name} {" "} sent you a message</li>)}
            </ul>
        )
        }

    }


    render() {

       
        console.log(this.props.userInfo)

       
        return (
            this.state.isLoading === true ? <div className="loading">Loading</div> :
                <div className="navigation">
                    <header>
                        <div className="navSitePic">
                            <a href="/" className="">
                                <img className="smScrnLogo" src="/logo500.png" alt="tree icon" />
                            </a>
                        </div>
                        <input type="checkbox" id="nav-toggle" className="nav-toggle" />

                        <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={this.props.drawerClickHandler} >
                            <span></span>
                        </label>
                        <ul className="homeButton">

                            <li>
                                <a id="home" href="/"> <i className="fa fa-home home"></i> Home </a>

                            </li>

                        </ul>

                    </header>


                    <div className={this.state.isActive ? "userAccount active" : "userAccount"} onClick={this.accountClick} >


                        <div className=" dropdown-toggle" id="userInfo"  >
                            <i className="fa fa-user">  {this.state.Name}</i>
                        </div>
                        <div className="dropDown">
                            <ul>
                                <Link to={"/profile/" + this.props.userInfo.user_ID}><li className="dropdown-item"> Profile</li> </Link>

                                <a className="dropdown-item" href="/landingPage" onClick={this.logout}>Logout</a>
                            </ul>
                            <div className="dropdown-divider"></div>

                        </div>

                    </div>

                    <div className="searchForm ">
                        <div className="searchBox">
                            <input type="text" className="searchInfo" placeholder="Search" onChange={this.onTextChanged} />

                            <button id="searchButton" className="btn btn-outline-secondary" type="submit"><i id="searchIcon" className="fa fa-search"></i> </button>
                            <div className="navIcons">
                            <Link to = "/inbox"> <div className="bellNotifications">
                                   <i id="bell" className="fas fa-bell"></i>
                                    <div className="notificationNumber">12</div>
                                </div></Link>
                                <div className="commentNotifications" onClick={this.openMessages}>
                                    <i id="note" className="fas fa-sticky-note"></i>
                                    <div className="notificationNumber">{(this.props.newMessages<0)?this.props.newMessages:null}</div>
                                </div>
                            </div>
                            <div className={(this.state.messagesOpen===true)?"instMessages":"noMessages"} >
                                {this.showMessages()}
                            
                            </div>
                            <div>{this.searchSuggestions()}</div>
                        </div>



                        <ul className="newFeedLink">

                            <li>
                                <a className="home "href="/"> <i className="fa fa-home"></i> Home </a>

                            </li>

                        </ul>
                    </div>
                </div>





        )
    }
}
let NavbarWithRouter= withRouter(Navbar);

export default NavbarWithRouter;



