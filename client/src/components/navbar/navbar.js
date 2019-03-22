import React from "react";
import "../../components/layouts/roots.css";
class Navbar extends React.Component {
    render(){
        return(
            <div className="navbar navbar-blue navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target="navbar" className="navebar-toggle">
                        <span className="sr-only"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="/dashboard" className="navebar-brand logo">
                        <img className="icon" src="./treeicon.png" alt="tree icon" />
                    </a>
                </div>
                <nav className="collapse navbar-collapse">
                    <form className="navbar-form navbar-left">
                        <div className="input-group input-group-sm bs-example">
                            <input ref="searchText" name="searchText" id="typeahead" type="text" className="form-control tt-query" />
                            <div className="input-group-btn searchBtn">
                                <button type="submit" className="btn btn-default">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navebar-nav">
                        <li>
                            <a href="/dashboard"> <i className="fa fa-home"></i> News Feed </a>

                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                    <a data-toggle="dropdown" herf="#" className="dropdown-toggle">
                            <i className="fa fa-user">Jaydawicked</i>
                        </a>
                        <ul className="dropdown-menu">
                            <li> <a href="/profile">Edit Profile</a>
                                <a href="/signout">Logout</a>
                            </li>
                        </ul>
                    </li>
                        
                    </ul>
                </nav>
            </div>


        )
    }
}

export default Navbar;