import React from 'react'

//~ REDUX
import { useDispatch,  useSelector} from 'react-redux'
import { authStatus } from '../store/todoRedux'


//^ Importing Form
import Form from '../components/Form'

export default function Home() {
	const dispatch = useDispatch()
	dispatch(authStatus())

	const userAuthStatus = useSelector((state) => state.todo.userAuthStatus)
	console.log(userAuthStatus)
	return (
		<div>
			{userAuthStatus ? <Form/> : <h2>Must Be Signed In</h2>}
		</div>
	)
}
