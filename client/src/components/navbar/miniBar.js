import React from "react";
import "../../components/layouts/roots.css";

import { Link } from "react-router-dom";


class MiniBar extends React.Component {



    render() {



        return (

            <div className="navigation">


                <div className="miniUserName"><Link to={"/"}><div>{this.props.userInfo.firstname + " " + this.props.userInfo.lastname}</div></Link></div>

            </div>







        )
    }
}

export default MiniBar;
