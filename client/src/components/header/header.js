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
        <div>
            <span className= "navbar-react">
            <img className="icon" src = "./treeicon.png" alt= "tree icon" />Roots of a Tree
            </span>
            <div className="collapse navbar-collapse" id="navbar">
                <form role ="form" id = "signin" className="navbar-form navbar-right">
                <div className ="input-group">
                <span className ="input-group-addon">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                 </span>
                 <input value={this.state.email} onChange={this.handleChange} type="email" placeholder= "Email Adress" name="email" ref="email" className="form-control"/>
                </div>
                <div className= "input group">
                    <span className= "input-group-addon">
                    <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder= "Password" name="password" ref="password" className="form-control"/>
                </div>
                <button type= "submit" onClick={this.login} className= "btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
};


export default Header;