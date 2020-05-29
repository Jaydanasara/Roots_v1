import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";

import Messenger from "../messenger/messenger";
import { connect } from "react-redux";

import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"
import SideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";




class MessenLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true,
        sideDrawerOpen:false,
    }
    }
 componentDidMount(){
        
        if (this.props.userInfo.emailaddress==="" ){
            this.logout()
        }
        else{
            this.screenNameData()
        }
    }



    logout() {
        Fire.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }


    drawToggleClickHandler=()=>{
        this.setState((prevState)=>{
            return {sideDrawerOpen:!prevState.sideDrawerOpen};
        });
    }

    backDropHandler=()=>{
        this.setState({sideDrawerOpen:false})
    };

    
    screenNameData = () => {

        API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading:false })
                
                 console.log(res)


            })

            .catch(err => console.log(err));

    }






    render() {
     
       let backDrop;
       
       if(this.state.sideDrawerOpen){
        backDrop = <BackDrop click={this.backDropHandler }/>;
       }


        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
               
                  
                </section>


                <section className="content-Container">
                  
                
                            <Navbar drawerClickHandler={this.drawToggleClickHandler} screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                          
                            <Messenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
                </section>
                <section className="messenger-area">
              
                
                
                </section>

            </div>
        )
    }



};



const mapDispatchToProps = (dispatch) =>{
    return{
        getUser: ( currentUserInfo) => dispatch (getUser(currentUserInfo))
    }
}



const mapStateToProps = (state)=>{
    console.log(state)
    return{
 userInfo:state.userR.userProfile
    
   
    }
}

export default connect(  mapStateToProps,mapDispatchToProps) (MessenLayout);




