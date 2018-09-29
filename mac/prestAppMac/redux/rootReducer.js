import {combineReducers} from "redux"
import todoReducer from './todoReducer/todoReducer'
import loginReducer from './loginReducer/loginReducer'

export default combineReducers ({
	todos: todoReducer,
	//login: loginReducer
})
