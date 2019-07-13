import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import Content from "../content/content";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ScreenName from "../screenName/screenName";


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
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
console.log(this.props)

        return (
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                    <ScreenName userInfo={this.props.userInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                            <Navbar userInfo={this.props.userInfo}/>
                            <Content userInfo={this.props.userInfo}/>
                            

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger/>
                </section>

            </div>
        )
    }



};



const mapStateToProps = (state)=>{
    console.log(state)
    return{
 userInfo:state.userR.userProfile
    
   
    }
}

export default connect(  mapStateToProps ) (Layout);




