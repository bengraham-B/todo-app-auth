import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    
    //^ Removes the user from local storage when the user logs out 
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: "LOGOUT"})

    }

    return {logout}
}