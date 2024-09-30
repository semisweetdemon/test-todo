"use client"
import React from "react"
import scss from "./Todo.module.scss"
import { useDeleteTodoMutation, usePutTodoMutation } from "@/redux/api/todo"
import { SubmitHandler, useForm } from "react-hook-form"

interface ITodo {
	item: Todo.Todo
}

export const Todo: React.FC<ITodo> = ({ item }) => {
	const [putTodo] = usePutTodoMutation()
	const { register, handleSubmit, setValue } = useForm<Todo.PutTodoUpload>({
		defaultValues: {
			title: item.title,
			image: item.image,
		},
	})

	const [edit, setEdit] = React.useState<boolean>(false)
	const [deleteTodo] = useDeleteTodoMutation()
	const handleClickDelete = async () => {
		await deleteTodo(item._id!)
	}

	const handleClickEdit = () => {
		setEdit(true)
	}

	const onSubmit: SubmitHandler<Todo.PutTodoUpload> = async (data) => {
		let newImageLink = item.image
		const formData = new FormData()
		formData.append("file", data.image[0])
		const res = await fetch("https://api-v2.elchocrud.pro/api/v1/upload/file", {
			method: "POST",
			body: formData,
		}).then((res) => res.json())

		if (res.url) {
			newImageLink = res.url
		}

		const newObject = {
			title: data.title,
			image: newImageLink,
		}
		await putTodo({
			data: newObject,
			id: item._id!,
		})
		setEdit(false)
	}

	const onClickCancel = () => {
		setEdit(false)
		setValue("title", item.title)
		setValue("image", item.image)
	}

	if (edit) {
		return (
			<form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
				<input type="text" {...register("title", { required: true })} />
				<input type="file" {...register("image", { required: false })} />
				<button type="submit">Submit</button>
				<button type="button" onClick={onClickCancel}>
					Cancel
				</button>
			</form>
		)
	}

	return (
		<div className={scss.todo}>
			<h3>{item.title}</h3>
			<img src={item.image} alt="Image" />
			<button onClick={handleClickEdit}>Edit</button>
			<button onClick={handleClickDelete}>Delete</button>
		</div>
	)
}
