import React, { useState } from 'react'

//~REDUX
import { useDispatch } from 'react-redux'
import { refreshCount } from '../store/todoRedux'

export default function TodeElement(props) {

    //^ Edit state, when true the details column will be an input and change the buttons to save and cancel
    const [edit, setEdit] = useState(false)
    const [editValue, setEditValue] = useState()

    const dispatch = useDispatch()

    const handleDelete = async (id, token) => {
        const todo = await fetch(`http://localhost:8002/api/todos/${id}`, {
            method:"DELETE",
            
			headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
		})

        const data = await todo.json()

        if(todo.ok){
            console.log("DELETE OK")
            dispatch(refreshCount())
        }
        console.log(data)

    }

    const saveEdit = async (id_edit, token) => {
        console.log("id_edit", id_edit)
       
        const todoEdit = await fetch(`http://localhost:8002/api/todos/${id_edit}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({details: editValue})
            
		})


        const data = await todoEdit.json()



        if(todoEdit.ok){
            dispatch(refreshCount())
            setEdit(false) //^ Sets the input back to text, which contains the update value
        }

    }

    return (
        <div id="Tode-Element">

            <div className="left-container">
                <div className="details-wrapper">
                   {edit ? <input type="text" placeholder={props.details} className="edit-input" onChange={(e) => setEditValue(e.target.value)}/>: <h1>{props.details}</h1>}
                </div>
                <div className="created-at-wrapper">
                    <h5>{props.createdAt}</h5>
                </div>
            </div>

            <div className="right-container">

                <div className="complete-button-wrapper">
                    {/* If edit is true it show the save button and if false the complete button, which will delete the todo */}
                    {edit ? <button onClick={() => saveEdit(props.id, props.token)}>Save</button> : <button onClick={() => handleDelete(props.id, props.token)}>Complete</button>}
                </div>
            
                <div className="edit-button-wrapper">
                    {/* If edit is true it show the cancel button and if false the edit button, which will change the details text to an inpu and allow the user to edit the todo */}
                    {edit ? <button onClick={() => setEdit(false)}>Cancel</button> : <button onClick={() => setEdit(true)}>Edit</button>}

                </div>

            </div>


            
        </div>
    )
}
