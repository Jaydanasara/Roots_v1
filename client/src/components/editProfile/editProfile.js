import React from "react"
import Fire from "../../config/fire";
import Navbar from "../navbar/navbar";
import ProfileEditor from "../profileEditor/profileEditor";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScreenName from "../screenName/screenName";
import API from "../../utils/API";
import  {getUser} from"../../store/actions/userActions"
// import "./roots.css";

class EditProfile extends React.Component {

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
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
console.log(this.props)

        return (
            this.state.isLoading === true ?<div className="loading">Loading</div> :
            <div className="app-container">
        
                <section id="left-menu">
                  <LeftMenu/>
                  <ScreenName userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>
                </section>


                <section className="content-Container">
                  
                        
                            <Navbar userInfo={this.props.userInfo}/>
                            <ProfileEditor userInfo={this.props.userInfo}/>
                            

                      
                    
                </section>
                <section className="messenger-area">
                <Messenger  userInfo={this.props.userInfo} />
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

export default connect(mapStateToProps,mapDispatchToProps ) (EditProfile);




