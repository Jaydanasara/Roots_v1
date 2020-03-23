import React from "react";
import "../../components/layouts/roots.css";

import { Link } from "react-router-dom";


class ScrMiniBar extends React.Component {



    render() {



        const user = this.props.userInfo;
        return (

            <div className="navigation">


<div className="miniScreenName"><Link to ={"/lgScreen"}><div>{this.props.screenInfo.screenName}</div> </Link></div>
            </div>







        )
    }
}

export default ScrMiniBar;
