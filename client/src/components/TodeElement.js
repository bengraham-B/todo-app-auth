import React from 'react'

//~REDUX
import { useDispatch } from 'react-redux'
import { refreshCount } from '../store/todoRedux'

export default function TodeElement(props) {

    const dispatch = useDispatch()

    const handleDelete = async (id, token) => {
        const todo = await fetch(`http://localhost:8001/api/todos/${id}`, {
            method:"DELETE",
            
			headers: {'Authorization': `Bearer ${token}`}
		})

        const data = await todo.json()

        if(todo.ok){
            console.log("DELETE OK")
            dispatch(refreshCount())
        }
        console.log(data)

    }

    const handleUpdate = () => {

    }


    return (
        <div id="Tode-Element">

            <div className="left-container">
                <div className="title-wrapper">
                    <h1>{props.details}</h1>
                </div>
                <div className="created-at-wrapper">
                    <h5>{props.createdAt}</h5>
                </div>
            </div>

            <div className="right-container">

                <div className="complete-button-wrapper">
                    <button onClick={() => handleDelete(props.id, props.token)}>Complete</button>
                </div>
            
                <div className="edit-button-wrapper">
                    <button>Edit</button>
                </div>

            </div>


            
        </div>
    )
}
