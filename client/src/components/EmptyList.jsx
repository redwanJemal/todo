/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useTodos } from '../context/TodoContext'

const EmptyList = ({ addTodo }) => {
	const { setShowAddNew } = useTodos()

	return (
		<div className='flex flex-col p-4 gap-1'>
			<span className='text-lg font-bold'>No Todos</span>
			<span className='text-gray-500 text-sm'>Get Started by Creating One</span>
			<button
				onClick={() => setShowAddNew(true)}
				className='text-gray-500 underline'
			>
				Add New
			</button>
		</div>
	)
}

export default EmptyList
