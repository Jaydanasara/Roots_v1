import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import MiniContent from "../content/miniContent";
import ScreenMessenger from "../messenger/screenNameMessenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ScreenProfile from "../content/screenProfile";
import API from "../../utils/API";



// import "./roots.css";

class ScrProLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading: true,

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
        console.log( this.state.screenNameInfo)

        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                  <MiniContent userInfo={this.props.userInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                <Navbar screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                            <ScreenProfile userInfo={this.props} screenInfo={this.state.screenNameInfo}/>
                            

                      
                    
                </section>
                <section className="messenger-area">
                <ScreenMessenger userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo} />
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

export default connect(  mapStateToProps ) (ScrProLayout);




