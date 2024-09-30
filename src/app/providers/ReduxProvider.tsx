"use client"
import { store } from "@/redux"
import React from "react"
import { Provider } from "react-redux"
interface IRedux {
	children: React.ReactNode
}

export const ReduxProvider: React.FC<IRedux> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}
