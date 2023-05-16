import React, {useEffect, useState} from 'react'

//~ REDUX
import { useDispatch } from 'react-redux'
import { refreshCount } from '../store/todoRedux'


export default function Form() {

    const dispatch = useDispatch()

	const [token, setToken] = useState()
    const [todoPost, setTodoPost] = useState()

    useEffect(() => {
        if(localStorage.getItem("user-l3t10")){
            const userJWT = JSON.parse(localStorage.getItem("user-l3t10"))
            setToken(userJWT.token)
        }

    }, [])
    

    const addTodo = async () =>{

        const postTodo = await fetch("http://localhost:8002/api/todos", {
            method: "POST",
            body: JSON.stringify({details: todoPost}),
            headers: {
                'Content-Type':"application/json",
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await postTodo.json()
        console.log(data)

        if(postTodo.ok){
            dispatch(refreshCount())
            setTodoPost("") //^ Clears the input after a user makes a successful post request.
        }

        
       
    }

    return (
        <div id="Form">
            <div className="input-container">
                <input type="text" value={todoPost} onChange={(e) => setTodoPost(e.target.value)}/>
            </div>
            <div className="button-container">
                <button onClick={addTodo}>Add Todo</button>
            </div>
        </div>
    )
}
