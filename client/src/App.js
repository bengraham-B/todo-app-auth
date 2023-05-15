import React, { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './styles/styles.css'

//^ Importing Components
import Navbar from './components/Navbar'

//^ Importing Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

export default function App() {
    const [user, setUser] = useState()

	//^ Checks if the user is authenticated
	useEffect(() => {
        if(localStorage.getItem("user-l3t10")){
            const object = JSON.parse(localStorage.getItem('user-l3t10'))
            setUser(object.email)
        } else {
            setUser("") //^ Removes email when the user logs out.
        }
    },[user])
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar/>

				<div className="pages">
					<Routes>
						{/* The <Navigate/> will protect the routes from unauthorised users */}
						<Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
						<Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
						<Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
					</Routes>
				</div>
			
			</BrowserRouter>
		</div>
	)
}
