import React, { useState } from 'react'

//~ REDUX
import { useDispatch } from 'react-redux'
import { signupRedux } from '../store/todoRedux'


export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const handleSignup = () => {
        dispatch(signupRedux({email:email, password:password}))

    }

    return (
        <div id="Login-Signup-form">

            <div className="form-container">

                <div className="title-container">
                    <h1>Sign Up</h1>
                </div>

                <div className="input-container">
                    <div className="email-wrapper">
                        <h2>Email</h2>
                        <h2>Test123@gmail.com</h2>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-wrapper">
                        <h2>Password</h2>
                        <h2>123GooseW@</h2>
                        <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="button-container">
                    <button onClick={handleSignup}>Login</button>
                </div>

            </div>


        </div>
    )
}
