import React, {useState} from 'react'

//~ REDUX
import { useDispatch,  useSelector} from 'react-redux'
import { authStatus, refreshCount } from '../store/todoRedux'


export default function Form() {

    const dispatch = useDispatch()

	const [token, setToken] = useState()
    const [todoPost, setTodoPost] = useState()
    
    const addTodo = async () =>{
        if(localStorage.getItem("user-l3t10")){
            const userJWT = JSON.parse(localStorage.getItem("user-l3t10"))
            setToken(userJWT.token)
        }
        console.log(token)

        const postTodo = await fetch("http://localhost:8001/api/todos", {
            method: "POST",
            body: JSON.stringify({details: todoPost}),
            headers: {
                'Content-Type':"application/json",
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await postTodo.json()
        console.log(data)

        dispatch(refreshCount())
        
       
    }

    return (
        <div id="Form">
            <div className="input-container">
                <input type="text" onChange={(e) => setTodoPost(e.target.value)}/>
            </div>
            <div className="button-container">
                <button onClick={addTodo}>Add Todo</button>
            </div>
        </div>
    )
}
