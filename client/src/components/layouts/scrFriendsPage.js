import React from "react";
import Fire from "../../config/fire";
import Navbar from "../navbar/navbar";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../leftMenu/leftMenu"
import ScrFriends from "../friendsList/scrFriends"
import API from "../../utils/API";


class ScrFriendsPage extends React.Component {
    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{},
        isLoading:true

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

        API.getScreenNameInfo({ _id: this.props.match.params.id, })

            .then(res => {
                this.setState({ screenNameInfo: res.data, isLoading:false})
                
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

                </section>


                <section className="content-Container">
                  
                        
                <Navbar screenInfo={this.state.screenNameInfo} whichName={this.state.isUserPage} userInfo={this.props.userInfo} />
                         
                            <ScrFriends userInfo={this.props.userInfo} screenInfo={this.state.screenNameInfo}/>

                      
                    
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

export default connect(  mapStateToProps ) (ScrFriendsPage);




