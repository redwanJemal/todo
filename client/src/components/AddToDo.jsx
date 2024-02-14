/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const AddToDo = ({ onAdd, isLoading }) => {
	const [name, setName] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		onAdd(name)
		setName('')
	}

	return (
		<form onSubmit={handleSubmit} className='mt-4 flex gap-2'>
			<input
				type='text'
				className='flex-1 p-2 border border-gray-300 rounded'
				placeholder='Add a new task'
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>

			{isLoading && <div>Loading...</div>}

			{!isLoading && (
				<button
					type='submit'
					className='bg-blue-700 text-white px-4 py-2 rounded-lg'
				>
					Add
				</button>
			)}
		</form>
	)
}

export default AddToDo
