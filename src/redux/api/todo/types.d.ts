namespace Todo {
	interface Todo {
		_id?: number
		title: string
		image: string
	}

	type GetAllTodoReq = void
	type GetAllTodoRes = Todo.Todo[]

	type PostTodoReq = Todo.Todo
	type PostTodoRes = void

	type PutTodoUpload = {
		title: string
		image: string
	}

	type PutTodoReq = {
		data: Todo.Todo
		id: number
	}
	type PutTodoRes = void

	type DeleteTodoReq = number
	type DeleteTodoRes = void
}
