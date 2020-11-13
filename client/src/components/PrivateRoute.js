import React from 'react'
import {Redirect, Route} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

export default function PrivateRoute({component :Component, ...rest}) {
    const {currentUser} = useAuth()

    console.log({currentUser})
    return (
        <Route
            {...rest}
            render={props=>{
               return currentUser ? <Component {...props}/> :<Redirect to="/landingPage" />
            }}
            >
            
        </Route>
    )
}
