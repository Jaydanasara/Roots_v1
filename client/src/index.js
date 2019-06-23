import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store, persistor } from "./store/Store";
import { PersistGate } from 'redux-persist/integration/react'
// import {createStore, applyMiddleware,compose} from "redux";

// import rootReducer from "./store/reducers/rootReducer";
// import thunk from "redux-thunk";
// import {persistStore,persistReducer} from "redux-persist";
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key: 'root',
//     storage,
//   }
//   const persistedReducer = persistReducer(persistConfig, rootReducer)

//   export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
//   }
//   const middleware =[thunk]


// const store = createStore(rootReducer, compose (applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//     );

ReactDOM.render(<Provider store= {store}><PersistGate loading={null} persistor={persistor}>
    <App /></PersistGate> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();