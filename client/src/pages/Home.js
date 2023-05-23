import React, {useEffect, useState} from 'react'


//~ REDUX
import { useDispatch,  useSelector} from 'react-redux'
import { authStatus } from '../store/todoRedux'



//^ Importing Form
import Form from '../components/Form'

//^ Importing Components
import TodeElement from '../components/TodeElement'

export default function Home() {
    const refreshCountRedux = useSelector((state) => state.todo.refreshCount)

	const [todos, setTodos] = useState([])
	const [token, setToken] = useState()
	useEffect(() => {
		async function fetchTodos(token){

			const todo = await fetch("http://localhost:8002/api/todos", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
		
			const data = await todo.json()

			setTodos(data) //^ Setting the Todos from the API to state.
			
		}
		
		const userJWT = JSON.parse(localStorage.getItem("user-l3t10"))
		setToken(userJWT.token)

		console.log(" ----- ",userJWT)
		if(localStorage.getItem("user-l3t10")){
			const userToken = userJWT.token

			fetchTodos(userToken) //^ Function which will fetch the todos
		}
	
	}, [refreshCountRedux])
	const dispatch = useDispatch()
	dispatch(authStatus())

	console.log(token)


	const userAuthStatus = useSelector((state) => state.todo.userAuthStatus)
	console.log(userAuthStatus)
	return (
		<div id="Home">
			{userAuthStatus ? <Form/> : <h2>Must Be Signed In</h2>}

			<div className="todo-container">
				{todos.map((todo) => (
					<TodeElement id={todo._id} token={token} details={todo.details} createdAt={todo.createdAt}/>
				))}

			</div>
		</div>
	)
}
