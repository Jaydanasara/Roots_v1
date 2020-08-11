import React, { Component } from 'react';
import "./components/layouts/roots.css";
import Homelayout from "./components/layouts/home";
import Layout from "./components/layouts/layout";
import Fire from "./config/fire";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Lostpassword from "./components/lostpassword/lostPassword";
import Profile from "./components/layouts/profile";
import FriendProfileLayout from "./components/layouts/friendProfileLayout";
import EditProfile from "./components/editProfile/editProfile";
import FriendsPage from "./components/layouts/friendsPage";
import { connect } from "react-redux";
import UserPhotos from './components/layouts/userPhotos';
import ScreenLayout from './components/layouts/screenLayout';
import ScrProLayout from './components/layouts/scrProLayout';
import ScrFriendProLayout from './components/layouts/scrFriendProLayout';
import ScreenPhotos from './components/layouts/screenPhotos';
import ScrFriendsPage from './components/layouts/scrFriendsPage';
import MessenLayout from './components/layouts/messenLayout';
import VideoChatLayout from './components/layouts/videoChatLayout';
import ScrMessenLayout from './components/layouts/scrMessenLayout';
import InboxLayout from "./components/layouts/inboxLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();


  }




  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user)

      if (user) {
        this.setState({ user });
        console.log("woking")

      } else {
        this.setState({ user: null });
        console.log("not working")

      }
    });

  }






  render() {


    return (

      <div className="app">


        <div>

          <Router>
            <div>
              <Switch>

                <Route exact path="/" render={() => this.state.user ? (<Layout />) : (<Homelayout />)} />
                <Route exact path="/layout" component={Layout} />
                <Route path="/lostPassword" component={Lostpassword} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/friendProfile/:id" component={FriendProfileLayout} />
                <Route exact path="/editprofile/:id" component={EditProfile} />
                <Route exact path="/friends/:id" component={FriendsPage} />
                <Route exact path="/photos/:id" component={UserPhotos} />
                <Route exact path="/lgScreen" component={ScreenLayout} />
                <Route exact path="/screenProfile/:id" component={ScrProLayout} />
                <Route exact path="/scrFriendProfile/:id" component={ScrFriendProLayout} />
                <Route exact path="/scrphotos/:id" component={ScreenPhotos} />
                <Route exact path="/scrFriends/:id" component={ScrFriendsPage} />
                <Route exact path="/messenger" component={MessenLayout} />
                <Route exact path="/scrmessenger" component={ScrMessenLayout} />
                <Route exact path="/videoChat/:id" component={VideoChatLayout} />
                <Route exact path="/inbox" component={InboxLayout} />
              </Switch>
            </div>
          </Router>
        </div>


      </div>






    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    userInfo: state.userR.userProfile


  }
}


export default connect(mapStateToProps)(App);

