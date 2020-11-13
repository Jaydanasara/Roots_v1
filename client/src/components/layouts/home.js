import React from "react";
import Signupform from "../../components/signup/signupform";
import Header from "../../components/header/header";
import Featurelist from "../../components/features/features";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"


class Homelayout extends React.Component{

   

    componentDidMount(){
        // if(this.props.userInfo.emailaddress !=="" ){
        //     sessionStorage.clear();
        // }
    
    }
    


    render() {
        return (
            
            <div>
                <Header/>
               <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Featurelist/>
                        </div>
                        <div className="col-md-5 col-md-offset-1">
                            <Signupform/>
                        </div>
                    </div>
                </div>
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

export default connect(  mapStateToProps) (Homelayout);

