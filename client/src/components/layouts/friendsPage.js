import React from "react";
import {auth} from "../../config/firebase";
import Navbar from "../navbar/navbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import FriendsList from "../friendsList/friendsList"
import ScreenName from "../screenName/screenName";
import API from "../../utils/API";
import ScrMiniBar from "../navbar/scrMiniBar";
import SideDrawer from "../../components//sideDrawer/sideDrawer";
import BackDrop from "../sideDrawer/backDrop/backDrop";
// import "./roots.css";

class FriendsPage extends React.Component {

   
    constructor(props)  {
        super(props)
        this.state= {
        screenNameInfo:{},
        isLoading: true,
        isUserPage:true,
        sideDrawerOpen:false,
        friends:[],
        firstname:"",
        lastname:"",
    }
    }
    componentDidMount(){
        this.getFriends()
        this.screenNameData()
    }



    logout() {
        auth.auth().signOut().then(function () {
            console.log("Sign-out successful")
        }).catch((error) => {
            console.log(error);
        });
    }

    getFriends=() =>{
        API.getFriendsinfo({_id:this.props.match.params.id})

        .then (res=>{
            this.setState({friends:res.data[0].friends,firstname:res.data[0].firstname,lastname:res.data[0].lastname})
            console.log(res.data)
        })
        .catch(err=> console.log(err));
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
                  <LeftMenu/>
                  <ScrMiniBar userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                  <ScreenName userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                <Navbar drawerClickHandler={this.drawToggleClickHandler}  whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <FriendsList userInfo={this.props.userInfo} friendsinfo={this.state.friends} firstName={this.state.firstname} lastName={this.state.lastname}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                           {backDrop}

                      
                    
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

export default connect(  mapStateToProps ) (FriendsPage);




