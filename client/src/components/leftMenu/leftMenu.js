import React from "react";



class LeftMenu extends React.Component{
    render(){
        return(
    
<div >
<div className= "sitePic">
                        <a href="/dashboard" className="">
                        <img src="./rootsicon.jpg" alt="tree icon" /> R.O.O.T.S.
                         </a>
                    </div>
                    <div className="groups">
                    <div className="group">
                    <div className="title">Title</div>
                    <ul className="sideBarUl">
                        <li className="liLinks">link</li>
                        <li className="liLinks">link</li>


        
                    </ul>
                    </div> 
                    </div>
                    </div>
        )
    }
    
}

export default LeftMenu;