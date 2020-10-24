import React from "react";
import "../../components/layouts/roots.css";

import { Link } from "react-router-dom";


class ScrMiniBar extends React.Component {



    render() {



       
        return (

            <div className="miniNavigation">


<div className="miniScreenName"><Link to ={"/lgScreen"}><div>{this.props.userInfo.screenName}</div> </Link></div>
            </div>







        )
    }
}

export default ScrMiniBar;
