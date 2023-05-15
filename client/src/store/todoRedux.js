import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",

    initialState: {
        userAuthStatus: false,
        refreshCount: 0,
        error: ""
    },

    reducers: {
        //^ Manages the authentication of the user globally
        authStatus: (state) => {
            if(localStorage.getItem('user-l3t10')){

                return {
                    ...state,
                    userAuthStatus: true
                };
            }
            
            if(!localStorage.getItem('user-l3t10')){

                return {
                    ...state,
                    userAuthStatus: false
                };
            }
        },

        loginRedux: async (state, props) => {
            console.log(props)

            try {
                const response = await fetch("http://localhost:8002/api/user/login", {
                    method: "POST",
                    body: JSON.stringify({
                            email: props.payload.email,
                            password: props.payload.password
                        }), //^ Sending the payload to backendend
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                //^ If repsosne is ok, it will let the user proceed
                const data = await response.json()
                
                console.log("Try Block")
                if(data.err){
                    console.log(data.err)
        
                }
                else {
                    localStorage.setItem('user-l3t10', JSON.stringify(data))
                    window.location.assign("/")
                    console.log("Else Block")
                    console.log("Auth true")
                    return {
                        ...state,
                        userAuthStatus: true
                    };

                }
               

            } catch(error) {
                console.log("Catch Block")

                state.error = "Could not connect to server"

            }



                
            
            



            
            
           
        },
        
        logOutRedux: async (state) => {
            window.location.assign("/login") //^ If logout successful the user will be directed to the login page.
            localStorage.removeItem('user-l3t10') //^ Removes user auth from localstorage
            return {
                ...state,
                userAuthStatus: true
            };
        },

        signupRedux: async(state, props) => {
            //^ Sending the payload to backend
            const response = await fetch("http://localhost:8002/api/user/signup", {
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

            //^ If repsosne is ok, it will let the user proceed
            if(response.ok){
                localStorage.setItem('user-l3t10', JSON.stringify(data))
                window.location.assign("/") //^ When the user logs in they will be sent to the home page.

                return {
                    ...state,
                    userAuthStatus: true
                };
            }
        },

        //^ Used to update UI
        refreshCount: (state) => {
            return {
                ...state,
                refreshCount: state.refreshCount + 1
            }
        }
    }
})

export const {addNewTodoRedux, loginRedux, signupRedux, logOutRedux, authStatus, getAllTodos, refreshCount} = todoSlice.actions
export default todoSlice.reducer