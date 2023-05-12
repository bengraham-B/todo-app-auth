import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",

    initialState: {
        todos: [],
        userAuthStatus: true,
        refreshCount: 0
    },

    reducers: {
        authStatus: (state) => {
            
            if(localStorage.getItem('user-l3t10')){
                console.log(" ----- In local Storage -----")
                return {
                    ...state,
                    userAuthStatus: true
                };
            }
            
            if(!localStorage.getItem('user-l3t10')){
                console.log("----- Not in local Storage -----")
                return {
                    ...state,
                    userAuthStatus: false
                };
            }
        },

        loginRedux: async (state, props) => {

            const response = await fetch("http://localhost:8001/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                        email: props.payload.email,
                        password: props.payload.password
                    }), //^ Sending the payload to backend
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            const data = await response.json()
            localStorage.setItem('user-l3t10', JSON.stringify(data))
            console.log(data)
            state.userAuthStatus = true
            window.location.assign("/")
        },
        
        logOutRedux: async (state) => {
            window.location.assign("/login")
            localStorage.removeItem('user-l3t10') //^ Removes user auth from localstorage
            console.log("LOGGED OUT")
            return {
                ...state,
                userAuthStatus: true
            };
        },

        

        signupRedux: async(state, props) => {
            //^ Sending the payload to backend
            const response = await fetch("http://localhost:8001/api/user/signup", {
                method: "POST",
                body: JSON.stringify({
                        email: props.payload.email,
                        password: props.payload.password
                    }), 
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            const data = await response.json()
            localStorage.setItem('user-l3t10', JSON.stringify(data))
            console.log(data)
            window.location.assign("/")


        },

        addNewTodoRedux: async (state, newTodo) => {
            console.log("REDUX", newTodo.payload)

            const todo = await fetch("http://localhost:8001/api/todos", {
                method: "POST",
                body: JSON.stringify({details: newTodo.payload}), //^ Sending the payload to backend
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await todo.json()
            console.log(data, "Todo added")
            
        }
    }
})

export const {addNewTodoRedux, loginRedux, signupRedux, logOutRedux, authStatus} = todoSlice.actions
export default todoSlice.reducer