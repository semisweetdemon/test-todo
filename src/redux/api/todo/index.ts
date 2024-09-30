import { api as index } from ".."

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAllTodo: builder.query<Todo.GetAllTodoRes, Todo.GetAllTodoReq>({
			query: () => ({
				url: "/todo-test",
				method: "GET",
			}),
			providesTags: ["todo"],
		}),
		postTodo: builder.mutation<Todo.PostTodoRes, Todo.PostTodoReq>({
			query: (data) => ({
				url: "/todo-test",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["todo"],
		}),
		putTodo: builder.mutation<Todo.PutTodoRes, Todo.PutTodoReq>({
			query: (data) => ({
				url: `/todo-test/${data.id}`,
				method: "PUT",
				body: data.data,
			}),
			invalidatesTags: ["todo"],
		}),
		deleteTodo: builder.mutation<Todo.DeleteTodoRes, Todo.DeleteTodoReq>({
			query: (id) => ({
				url: `/todo-test/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["todo"],
		}),
	}),
})

export const { useGetAllTodoQuery, usePostTodoMutation, usePutTodoMutation, useDeleteTodoMutation } = api
