import React, { Component } from 'react';

import Homelayout from "./components/layouts/home";
import Layout from "./components/layouts/layout";
import Fire from "./config/fire";

import './App.css';






class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }

  componentDidMount(){
    this.authListener();
  }




  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });

      } else {
        this.setState({ user: null });

      }
    });

  }



  render() {
    return (

        <div className="App">
           
        {this.state.user ? (<Layout/>) : (<Homelayout />)}
        </div>
     





    );
  }
}

export default App;
