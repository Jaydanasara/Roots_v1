import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import Content from "../content/content";
import Messenger from "../messenger/messenger";
// import "./roots.css";

class Layout extends React.Component {


    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        return (
            <div className="app-container">
                <section id="left-menu">
                    <div className= "sitePic">
                        <a href="/dashboard" className="">
                            <img src="./treeicon.png" alt="tree icon" /> R.O.O.T.S.
                         </a>
                    </div>
                    <div className="groups">
                    <div className="group">
                    <div className="title">Title</div>
                    <ul className="sideBarUl">
                        <li className="liLinks">link</li>
                        <li className="liLinks">link</li>


        
                    </ul>
                    </div> </div>

                </section>


                <section className="content-Container">
                  
                        
                            <Navbar />
                            <Content/>
                            

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger/>
                </section>

            </div>
        )
    }



};

export default Layout;