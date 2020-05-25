import React from "react";
import "../../components/layouts/roots.css";
import Fire from "../../config/fire";
import API from "../../utils/API";
import { Link } from "react-router-dom";


class Navbar extends React.Component {

    state = {
        isActive: false,
        Name: "",
        isLoading: false,
        search: "",
        allUsers: [],
        Users: "",
        reload:false
        

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
                {suggestions.map((item) => <li  onClick={this.reloadFunc} className="searchResponse">  <Link to={"/profile/" + item._id}><img className="search-Img" src={item.userPic} />{item.firstname} {" "}{item.lastname} </Link> </li>)}
            </ul>
        )



    }

    reloadFunc=()=>{
     this.setState({reload:!this.state.reload})
     window.location.reload(false);
    }


    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
        sessionStorage.clear();
    }


    render() {



        const user = this.props.userInfo;
        return (
            this.state.isLoading === true ? <div className="loading">Loading</div> :
                <div className="navigation">
                    <header>
                    <div className="navSitePic">
                    <a href="/" className="">
                        <img src="/rootsicon.jpg" alt="tree icon" /> 
                         </a>
                </div>
                        <input type="checkbox" id="nav-toggle" class="nav-toggle" />
                    <nav>
                            <ul>
                                <li> <a href="/">Home</a></li>
                                <li> <a href="/">About Us</a></li>
                                <li> <a href="/">Our Trips</a></li>
                                <li> <a href="/">Contact Us</a></li>
                            </ul>
                        </nav>
                        <label for="nav-toggle" class="nav-toggle-label">
                            <span></span>
                        </label>
                        <ul className="homeButton">

                        <li>
    <a href="/"> <i className="fa fa-home"></i> Home </a>

</li>

</ul>

                    </header>


                    <div className={this.state.isActive ? "userAccount active" : "userAccount"} onClick={this.accountClick} >


                        <div className=" dropdown-toggle" id="userInfo"  >
                            <i className="fa fa-user">  {this.state.Name}</i>
                        </div>
                        <div className="dropDown">
                            <a className="dropdown-item" href="/profile/:id">Edit Profile</a>
                            <a className="dropdown-item" href="/" onClick={this.logout}>Logout</a>

                            <div className="dropdown-divider"></div>

                        </div>

                    </div>

                    <div className="searchForm ">
                        <div className="searchBox">
                            <input type="text" className="searchInfo" placeholder="Search" onChange={this.onTextChanged} />

                            <button id="searchButton" className="btn btn-outline-secondary" type="submit"><i id="searchIcon" className="fa fa-search"></i> </button>
                            <div className="navIcons">
                                <div className="bellNotifications">
                                    <i id="bell" className="fas fa-bell"></i>
                                    <div className="notificationNumber">13</div>
                                </div>
                                <div className="commentNotifications">
                                    <i id="note" className="fas fa-sticky-note"></i>
                                    <div className="notificationNumber">13</div>
                                </div>
                            </div>
                            <div>{this.searchSuggestions()}</div>
                        </div>



                        <ul className="newFeedLink">

                            <li>
                                <a href="/"> <i className="fa fa-home"></i> Home </a>

                            </li>

                        </ul>
                    </div>
                </div>





        )
    }
}

export default Navbar;


