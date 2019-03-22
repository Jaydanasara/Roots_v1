import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import "./roots.css";

class Layout extends React.Component{


logout(){
    Fire.auth().signOut().then(function() {
        console.log("Sign-out successful")
      }).catch((error)=>{
        console.log(error);
      });
}


    render(){
        return(
            <div className = "wrapper">
                <div className = "box">
                    <div className = "s row row-offcanvas row-offcanvas-left push-down-50">
                        <Navbar/>
                         {this.props.sidebar}
                         {this.props.content}
                         <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }
    

    
};

export default Layout;