import React from "react";
import "./sideDrawer.css"
import { Link } from "react-router-dom"; 
import { connect } from "react-redux";
const ScrSideDrawer = props=>{
let drawerClasses = "side-drawer";
if(props.show){
    drawerClasses="side-drawer open";
}

    return (
    <div className= {drawerClasses}>
        <ul className= "side-DrawerList">
        <li><Link to ={"/"}><div>{props.userInfo.firstname} {" "} {props.userInfo.lastname}</div> </Link></li>
            <li><Link to ={"/scrmessenger"}><div>Messenger</div> </Link></li>
        </ul>
    </div>


    );

};

const mapStateToProps = (state)=>{
    console.log(state)
    return{
 userInfo:state.userR.userProfile
    
   
    }
}

export default connect(  mapStateToProps ) (ScrSideDrawer);