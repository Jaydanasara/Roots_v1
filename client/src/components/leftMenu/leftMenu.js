import React from "react";



class LeftMenu extends React.Component {
    render() {
        
        return (

            <div >
                <div className="sitePic">
                    <a href="/" className="">
                        <img src="https://firebasestorage.googleapis.com/v0/b/roots-6f3a0.appspot.com/o/admin%2Frootsicon.jpg?alt=media&token=f8f88ae3-3534-4591-b72e-1f92eb9d40f4" alt="tree icon" /> R.O.O.T.S.
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