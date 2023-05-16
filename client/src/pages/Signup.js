import React, { useState } from 'react'


export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()



   


    const handleSignup = async () => {
        setError(null)

        try {
            //^ Sending the payload to backend
            const response = await fetch("http://localhost:8002/api/user/signup", {
            method: "POST",
            body: JSON.stringify({
                    email: email,
                    password: password
                }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)

        //^ If repsosne is ok, it will let the user proceed
        if(data.err){
            setError(data.err)
        }

        //^ If no error is provided in the response it will allow the user to procced
        else {
            localStorage.setItem('user-l3t10', JSON.stringify(data))
            window.location.assign("/") //^ When the user logs in they will be sent to the home page.
        }
       
        //^ If the fetch request fails it will throw this error
        } catch(error){
            setError("Cannot connect to Server")
        }

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
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-wrapper">
                        <h2>Password</h2>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="button-container">
                    <button onClick={handleSignup}>Sign Up</button>
                </div>

                {error && <div className="error-container">
                    <div>
                         <h4>{error}</h4>
                    </div>
                </div>}
            </div>
        </div>
    )
}
