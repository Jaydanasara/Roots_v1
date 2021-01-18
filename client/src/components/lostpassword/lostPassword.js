import React, { useRef, useState } from 'react'

import { useAuth } from "../../context/AuthContext"
import {Link,} from "react-router-dom"




export default function LostPassword() {
    const emailRef = useRef();
   
    const { resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
 

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your Email for further instructions")
           
        } catch (error) {
            console.log(error)
            setError("Failed to reset Passoword check your spelling and try again")

        }
        setLoading(false)
    }

    return (
        <div className = "lostPasswordContain">
            <div className="lostPassWrapper">
            <h1>Password Reset </h1>
            <h2 className="errMessage">{error}</h2>
            <h2 className = "successMessage">{message}</h2>
            <input type="email" placeholder="Email Address" name="emailaddress" ref={emailRef} className="signupInput" required />

            <button className="lostPassBtn" onClick={handleSubmit}>Reset Password</button>
           <div className=" landingLink"> <Link to = "/landingPage">Signup or Login</Link></div>
            </div>
        </div>
    )
}
