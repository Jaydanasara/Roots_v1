import {createStore, applyMiddleware,compose} from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import {persistStore,persistReducer} from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    storage :storageSession,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  
    let store = createStore(persistedReducer, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )

  
    
    );
    let persistor = persistStore(store)
  

  



    export  { store, persistor }