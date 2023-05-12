import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {

    //^ Importin user from Auth Context
    const { user } = useAuthContext()


    return (
        <div id="Navbar">
            <div className="nav-container">
                <Link to="/">
                    <h1>TODO APP</h1>
                </Link>
                <nav>
                {user && (<div className='logout-button'>
                        <span>Ben@gmail.com</span>
                        <button>Log Out</button>
                    </div>)}

                {!user && (<div className='login-signup-container'>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </div>)}

                </nav>
            </div>
        </div>
    )
}
