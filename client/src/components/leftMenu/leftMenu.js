import React from "react";
import {Link} from "react-router-dom"



class LeftMenu extends React.Component {
    render() {
        
        return (

            <div >
                <div className="sitePic">
                    <a href="/" className="">
                        <img  className= "siteLogo" src="https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2FlogoTransparent.png?alt=media&token=cdaf21c0-865e-4aca-afc7-6380cbe07802" alt="tree icon" /> R.O.O.T.S.
                         </a>
                </div>
                <div className="groups">
                    <div className="group">
                        <div className="title">Title</div>
                        <ul className="sideBarUl">
                            <li className="liLinks"><a href="/friends">Friends</a></li>
                            <li className="liLinks">< Link to ={"/groups"}>Groups</Link></li>



                        </ul>
                       
                    </div>
                </div>
            </div>
        )
    }

}

export default LeftMenu;