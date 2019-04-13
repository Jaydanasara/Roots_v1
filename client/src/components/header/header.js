import React from "react";
import Fire from "../../config/fire";
import "../../components/layouts/roots.css";


class Header extends React.Component{
    
    state = {
       
        password: "",
        email:""
      }






    login(e) {
        e.preventDefault();
       Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
       .then((u)=>{
       }).catch((error)=>{
           console.log(error);
       });
  
       }

       login = e => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
        Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .catch(err => console.log(err));


       }




handleChange = e => {
    

    this.setState({
      [e.target.name]: e.target.value
    });
  };






render(){
    return(
        <div className="header_container">
            <span className= "logoSpan">
            <img className="sitePic1" src = "./treeicon.png" alt= "tree icon"/><h2 className="siteName">Roots of a Tree</h2>
            </span>
            <div className="memberLogin">
                <form role ="form" id = "signin" className="headerBar">
                <div className ="input1">
                <span className ="input-group-addon1">
                <i className="fa fa-user-circle"  id="loginIcon" aria-hidden="true"></i>
                 </span>
                 <input value={this.state.email} onChange={this.handleChange} type="email" placeholder= "Email Adress" name="email" ref="email" className="loginInput"/>
                </div>
                <div className= "input1">
                    <span className= "input-group-addon1">
                    <i className="fa fa-key" id="loginIcon" aria-hidden="true"></i>
                    </span>
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder= "Password" name="password" ref="password" className="loginInput"/>
                </div>
                <button type= "submit" onClick={this.login} className= "btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
};


export default Header;