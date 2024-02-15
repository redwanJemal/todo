/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState } from 'react'
import { useTodos } from '../context/TodoContext'

const api = axios.create({
	baseURL: 'https://localhost:7193/api',
})

export const useTodoApi = () => {
	const [todos, setTodos] = useState([])
	const [pagingData, setPagingData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const { setShowAddNew } = useTodos()

	const fetchTodos = () => {
		setIsLoading(true)
		api
			.get('/todos')
			.then((response) => {
				setTodos(response.data?.data)
				setShowAddNew(response.data?.data.length > 0)
				setPagingData({
					currentPage: response.data?.currentPage,
					totalPages: response.data?.totalPages,
					totalCount: response.data?.totalCount,
				})
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false))
	}

	const addTodo = (newTodoName) => {
		setIsLoading(true)
		api
			.post('/todos', { name: newTodoName })
			.then((response) => {
				setTodos([...todos, response.data])
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false))
	}

	const deleteTodo = (id) => {
		setIsLoading(true)
		api
			.delete(`/todos/${id}`)
			.then(() => {
				setTodos(todos.filter((todo) => todo.id !== id))
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false))
	}

	const editTodo = (id, newName) => {
		setIsLoading(true)
		api
			.put(`/todos/${id}`, { name: newName, id: id })
			.then((response) => {
				setTodos(
					todos.map((todo) =>
						todo.id === id ? { name: newName, id: id } : todo
					)
				)
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false))
	}

	const searchTodos = (search) => {
		setIsLoading(true)

		api
			.get(`/todos?searchTerm=${search.toLowerCase()}`)
			.then((response) => {
				setTodos(response.data?.data)
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false))
	}

	return {
		todos,
		pagingData,
		isLoading,
		fetchTodos,
		addTodo,
		editTodo,
		deleteTodo,
		searchTodos,
	}
}
