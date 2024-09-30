/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Todo {
	interface Todo {
		_id?: number
		title: string
		image: string
	}

	type GetAllTodoReq = void
	type GetAllTodoRes = Todo[]

	type PostTodoReq = Todo
	type PostTodoRes = void

	type PutTodoUpload = {
		title: string
		image: string
	}

	type PutTodoReq = {
		data: Todo
		id: number
	}
	type PutTodoRes = void

	type DeleteTodoReq = number
	type DeleteTodoRes = void
}
