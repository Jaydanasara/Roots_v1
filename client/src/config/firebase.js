import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey:"AIzaSyCXP1zQ4p0yztONIzc8iu8zyaacW2Fynk4",
    authDomain:"roots-6f3a0.firebaseapp.com",
    databaseURL: "https://roots-6f3a0.firebaseio.com",
    projectId: "roots-6f3a0",
    storageBucket:"roots-6f3a0.appspot.com",
    messagingSenderId:"16203055088",
  
})
 export const storage = firebase.storage();
export const auth = app.auth();
export{
    app,storage as default


} 