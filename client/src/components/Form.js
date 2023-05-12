import React, {useState} from 'react'
import { addNewTodoRedux } from '../store/todoRedux'
import { useDispatch } from 'react-redux'


export default function Form() {
    const [todo, setTodo] = useState()
    const dispatch = useDispatch()

    const addTodo = async () =>{
        dispatch(addNewTodoRedux(todo))
    }

    return (
        <div id="Form">
            <div className="input-container">
                <input type="text" onChange={(e) => setTodo(e.target.value)}/>
            </div>
            <div className="button-container">
                <button onClick={addTodo}>Add Todo</button>
            </div>
        </div>
    )
}
