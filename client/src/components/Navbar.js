import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,  useSelector} from 'react-redux'
import { logOutRedux, authStatus } from '../store/todoRedux'


export default function Navbar() {
    const dispatch = useDispatch()

    const [userName, setUserName] = useState()
   

    const logout = () =>{
        dispatch(logOutRedux())
        dispatch(authStatus())
    }
    dispatch(authStatus()) //^ Checks auth status and sets it accordingly.
    const user = useSelector((state) => state.todo.userAuthStatus)

    useEffect(() => {
        if(localStorage.getItem("user-l3t10")){
            const object = JSON.parse(localStorage.getItem('user-l3t10'))
            setUserName(object.email)
        } else {
            setUserName("")
        }
    },[])


    return (
        <div id="Navbar">
            <div className="nav-container">
                <Link to="/">
                    <h1>TODO APP</h1>
                </Link>
                <nav>
                {user && (<div className='logout-button'>
                        <span>{userName}</span>
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
