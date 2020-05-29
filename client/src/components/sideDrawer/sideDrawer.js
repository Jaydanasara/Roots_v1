import React from "react";
import "./sideDrawer.css"
import { Link } from "react-router-dom"; 
import { connect } from "react-redux";
const SideDrawer = props=>{
let drawerClasses = "side-drawer";
if(props.show){
    drawerClasses="side-drawer open";
}

    return (
    <div className= {drawerClasses}>
        <ul className= "side-DrawerList">
            <li><Link to ={"/lgScreen"}><div>{props.userInfo.screenName}</div> </Link></li>
            <li><Link to ={"/messenger"}><div>Messenger</div> </Link></li>
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

export default connect(  mapStateToProps ) (SideDrawer);