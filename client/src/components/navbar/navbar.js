import React from "react";
import "../../components/layouts/roots.css";
import Fire from "../../config/fire";


class Navbar extends React.Component {


    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        return (
            <div className="navigation">

                <div className="userAccount">

                    <div className="btn-group" id="userMenu">
                        <a className=" dropdown-toggle" id="userInfo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-user">  Jaydawicked</i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/profile">Edit Profile</a>
                            <a className="dropdown-item" href="/signout" onClick={this.logout}>Logout</a>

                            <div className="dropdown-divider"></div>

                        </div>
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
                            <a href="/dashboard"> <i className="fa fa-home"></i> News Feed </a>

                        </li>

                    </ul>
                </div>
            </div>





        )
    }
}

export default Navbar;


