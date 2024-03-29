import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from "react-redux";
import { store, persistor } from "./store/Store";
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(<Provider store= {store}><PersistGate loading={null} persistor={persistor}>
    <App /></PersistGate> </Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();