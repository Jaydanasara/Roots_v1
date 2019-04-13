import React from "react";
import Signupform from "../../components/signup/signupform";
import Header from "../../components/header/header";
import Featurelist from "../../components/features/features";
// import "../../components/layouts/roots.css";

class Homelayout extends React.Component{
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

export default Homelayout;