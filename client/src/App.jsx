/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import SearchToDo from './components/SearchToDo'
import ListToDo from './components/ListToDo'
import AddToDo from './components/AddToDo'
import { useTodoApi } from './hooks/useTodoApi'
import { TodoProvider, useTodos } from './context/TodoContext' // Ensure the correct import path

function AppInner() {
	const {
		todos,
		isLoading,
		fetchTodos,
		addTodo,
		searchTodos,
		editTodo,
		deleteTodo,
	} = useTodoApi()

	const { showAddNew } = useTodos() // Use the context

	useEffect(() => {
		fetchTodos()
	}, [])

	return (
		<>
			<Header />
			<SearchToDo onSearch={searchTodos} />
			<ListToDo todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
			{showAddNew && <AddToDo onAdd={addTodo} isLoading={isLoading} />}
		</>
	)
}

// Wrap the App component with TodoProvider at a higher level
function App() {
	return (
		<TodoProvider>
			<AppInner />
		</TodoProvider>
	)
}

export default App
