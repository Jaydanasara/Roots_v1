import React from "react";
import Fire from "../../config/fire";
import ScrNavbar from "../navbar/scrnavbar";
import MiniContent from "../content/miniContent";
import ScreenMessenger from "../messenger/screenNameMessenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import LgScreenName from "../screenName/lgScreenName";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"


// import "./roots.css";

class ScreenLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:false
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

    

    screenNameData = () => {

        API.getScreenNameInfo({ user_ID: this.props.userInfo.user_ID, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading:false })
                
                 console.log(res)


            })

            .catch(err => console.log(err));

    }











    render() {
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
console.log(this.props.userInfo)
console.log(this.state.screenNameInfo)

        return (

            this.state.isLoading === true ?<div className="loading">Loading</div> :

            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                    <MiniContent userInfo={this.props.userInfo} disState={this.props}/>
                </section>


                <section className="content-Container">
                  
                        
                <ScrNavbar screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                            <LgScreenName userInfo={this.props.userInfo} disState={this.props} screenInfo={this.state.screenNameInfo}/>
                            

                      
                    
                </section>
                <section className="messenger-area">
                <ScreenMessenger userInfo={this.props.userInfo}  screenInfo={this.state.screenNameInfo} />
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

export default connect(  mapStateToProps,mapDispatchToProps ) (ScreenLayout);




