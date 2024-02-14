/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react'

const TodoContext = createContext()

export const useTodos = () => useContext(TodoContext)

export const TodoProvider = ({ children }) => {
	const [showAddNew, setShowAddNew] = useState(false)

	return (
		<TodoContext.Provider value={{ showAddNew, setShowAddNew }}>
			{children}
		</TodoContext.Provider>
	)
}
