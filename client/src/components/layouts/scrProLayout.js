import React from "react";
import Fire from "../../config/fire";
import Navbar from "../../components/navbar/navbar";
import MiniContent from "../content/miniContent";
import Messenger from "../messenger/messenger";
import { connect } from "react-redux";
import LeftMenu from "../../components/leftMenu/leftMenu"
import ScreenProfile from "../content/screenProfile";
import API from "../../utils/API";



// import "./roots.css";

class ScrProLayout extends React.Component {

    constructor(props)  {
        super(props)
    this.state= {
        screenNameInfo:{}

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
                this.setState({ screenNameInfo: res.data })
                
                 console.log(res)


            })

            .catch(err => console.log(err));

    }











    render() {
        console.log(this.props.userInfo.firstname,this.props.userInfo.lastname)      
        console.log(this.props)

        return (
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

export default connect(  mapStateToProps ) (ScrProLayout);




