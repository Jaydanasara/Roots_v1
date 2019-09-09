import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ProfileContent from "../content/profileContent";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import ScreenName from"../../components/screenName/screenName";
import API from "../../utils/API";

// import "./roots.css";

class Profile extends React.Component {


    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true
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


        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
                   <LeftMenu/>
                   <ScreenName userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                <Navbar whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                            <ProfileContent userInfo={this.props} />
                            

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger userInfo={this.props.userInfo} />
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

export default connect(  mapStateToProps ) (Profile);




