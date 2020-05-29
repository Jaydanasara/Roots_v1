import React from "react";
import Fire from "../../config/fire";
import ScrNavbar from "../navbar/scrnavbar";
import ScreenMessenger from "../messenger/screenNameMessenger";
import { connect } from "react-redux";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"
import ScrSideDrawer from "../sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";



// import "./roots.css";

class ScrMessenLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:false,
        sideDrawerOpen:false,
    }
    }
    componentDidMount(){
        this.screenNameData()
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
                  
                        
                <ScrNavbar drawerClickHandler={this.drawToggleClickHandler}  screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                
                <ScreenMessenger userInfo={this.props.userInfo}  screenInfo={this.state.screenNameInfo} />
                
                <ScrSideDrawer show={this.state.sideDrawerOpen}/>
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

export default connect(  mapStateToProps,mapDispatchToProps ) (ScrMessenLayout);




