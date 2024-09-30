"use client"
import React from "react"
import scss from "./Home.module.scss"
import { useGetAllTodoQuery, usePostTodoMutation } from "@/redux/api/todo"
import { SubmitHandler, useForm } from "react-hook-form"
import { Todo } from "../components/Todo"

export const Home: React.FC = () => {
	const { data } = useGetAllTodoQuery()
	const [postTodo] = usePostTodoMutation()

	const { register, handleSubmit, reset } = useForm<Todo.PostTodoReq>()

	const onSubmit: SubmitHandler<Todo.PostTodoReq> = async (data) => {
		const formData = new FormData()
		formData.append("file", data.image[0])
		const res = await fetch("https://api-v2.elchocrud.pro/api/v1/upload/file", {
			method: "POST",
			body: formData,
		}).then((res) => res.json())

		const newObject = {
			title: data.title,
			image: res.url,
		}

		await postTodo(newObject)
		reset()
	}

	return (
		<>
			<section className={scss.create}>
				<div className="container">
					<div className={scss.content}>
						<h1>Home</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input type="text" {...register("title", { required: true })} />
							<input type="file" {...register("image", { required: true })} />
							<button type="submit">Submit</button>
						</form>
					</div>
				</div>
			</section>
			<section className={scss.items}>
				<div className="container">
					<div className={scss.content}>
						{data?.map((item, index) => (
							<React.Fragment key={index}>
								<Todo item={item} />
							</React.Fragment>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
