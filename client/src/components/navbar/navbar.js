import React from "react";
import "../../components/layouts/roots.css";
import Fire from "../../config/fire";



class Navbar extends React.Component {

    state={
        isActive: false


    }


    accountClick = () => {

        this.setState({isActive: !this.state.isActive })
    };





    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
        sessionStorage.clear();
    }


    render() {
    console.log(this.props.userInfo)
    const user =this.props.userInfo;
        return (
            
            <div className="navigation">

                <div className={this.state.isActive ?"userAccount active": "userAccount" } onClick={this.accountClick} >


                    <div className=" dropdown-toggle" id="userInfo"  >
                        <i className="fa fa-user">  {user.firstname}  {user.lastname}</i>
                    </div>
                    <div className="dropDown">
                        <a className="dropdown-item" href="/profile/:id">Edit Profile</a>
                        <a className="dropdown-item" href="/" onClick={this.logout}>Logout</a>

                        <div className="dropdown-divider"></div>

                    </div>

                </div>

                <div className="searchForm ">
                    <div className="searchBox">
                        <input type="text" className="searchInfo" placeholder="Search" />

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
                    </div>



                    <ul className="newFeedLink">

                        <li>
                            <a href="/"> <i className="fa fa-home"></i> News Feed </a>

                        </li>

                    </ul>
                </div>
            </div>





        )
    }
}

export default Navbar;


