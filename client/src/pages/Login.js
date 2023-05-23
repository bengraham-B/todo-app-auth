import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(null)


    
    const handleLogin = async () => {
        setError(null)


        try {
            const response = await fetch("http://localhost:8002/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                        email: email,
                        password: password
                    }), //^ Sending the payload to backendend
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await response.json()


             //^ If repsosne is ok, it will let the user proceed
            if(data.err){
                setError(data.err)
    
            }

            //^ If no error is provided in the response it will allow the user to procced
            else {
                localStorage.setItem('user-l3t10', JSON.stringify(data))
                window.location.assign("/")
            }
        }

        //^ If the fetch request fails it will throw this error
        catch(error) {
            setError("Cannot connect to Server")
        }
    }

    return (
        <div id="Login-Signup-form">

            <div className="form-container">

                <div className="title-container">
                    <h1>Login</h1>
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
                    <button onClick={handleLogin}>Login</button>
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
