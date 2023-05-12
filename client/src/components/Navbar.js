import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,  useSelector} from 'react-redux'
import { logOutRedux, authStatus } from '../store/todoRedux'


export default function Navbar() {
    const dispatch = useDispatch()
   

    const logout = () =>{
        dispatch(logOutRedux())
        dispatch(authStatus())
    }
    dispatch(authStatus()) //^ Checks auth status and sets it accordingly.
    const user = useSelector((state) => state.todo.userAuthStatus)

    return (
        <div id="Navbar">
            <div className="nav-container">
                <Link to="/">
                    <h1>TODO APP</h1>
                </Link>
                <nav>
                {user && (<div className='logout-button'>
                        <span>Ben@gmail.com</span>
                        <button onClick={logout}>Log Out</button>
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
