import React from "react";



class LeftMenu extends React.Component {
    render() {
        
        return (

            <div >
                <div className="sitePic">
                    <a href="/" className="">
                        <img src="./rootsicon.jpg" alt="tree icon" /> R.O.O.T.S.
                         </a>
                </div>
                <div className="groups">
                    <div className="group">
                        <div className="title">Title</div>
                        <ul className="sideBarUl">
                            <li className="liLinks"><a href="/friends">Friends</a></li>
                            <li className="liLinks">Groups</li>



                        </ul>
                       
                    </div>
                </div>
            </div>
        )
    }

}

export default LeftMenu;