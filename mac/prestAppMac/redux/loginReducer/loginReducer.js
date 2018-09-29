import { TODO} from './actions'

const initialState = {
	todos: [],
	currentIndex: 0,
}

const todos = (state = initialState, action) => {
	switch (action.type) {
		case TODO.ADD:
			const newTodo = {title: action.text, index: state.currentIndex, done: false}
			return {
				...state,
				todos: [...state.todos, newTodo],
				currentIndex: state.currentIndex + 1
			}
		case TODO.TOGGLE:
			const todoItem = action.todo
			const todos = Object.assign([], state.todos)
			const index = todos.indexOf(todoItem)
			if(todoItem.done === false) {
	               todoItem.done = true
	          } else if(todoItem.done === true) {
	               todoItem.done = false
	          }
			todos[index] = todoItem
			return {
				...state,
				todos: todos
			}
		default:
			return state
	}
}

export default todos
