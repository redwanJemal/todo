/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import editImg from '../assets/edit.svg'
import deleteImg from '../assets/trash.svg'
import cancelImg from '../assets/cancel.svg'
import saveImg from '../assets/save.svg'
import EmptyList from './EmptyList'
import { useTodos } from '../context/TodoContext'

const ListToDo = ({ todos, onEdit, onDelete }) => {
	const [editId, setEditId] = useState(null)
	const [editText, setEditText] = useState('')
	const { showAddNew } = useTodos()

	const handleEdit = (todo) => {
		setEditId(todo.id)
		setEditText(todo.name)
	}

	const handleSave = (id) => {
		onEdit(id, editText)
		setEditId(null)
	}

	const handleCancel = () => {
		setEditId(null)
	}

	return (
		<div className='mt-4 space-y-2'>
			{todos.map((todo) => (
				<div
					key={todo.id}
					className='flex justify-between items-center border p-2'
				>
					{editId === todo.id ? (
						<input
							type='text'
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
							className='flex-1 mr-2'
						/>
					) : (
						<span>{todo.name}</span>
					)}
					{editId === todo.id ? (
						<div>
							<button
								onClick={() => handleSave(todo.id)}
								className='text-green-500 mr-2'
							>
								<img src={saveImg} className='w-4' alt='Save' />
							</button>
							<button onClick={handleCancel} className='text-gray-500'>
								<img src={cancelImg} className='w-4' alt='cancel' />
							</button>
						</div>
					) : (
						<div>
							<button
								onClick={() => handleEdit(todo)}
								className='text-blue-500 mr-2'
							>
								<img src={editImg} className='w-4' alt='Edit' />
							</button>
							<button
								onClick={() => onDelete(todo.id)}
								className='text-red-500'
							>
								<img src={deleteImg} className='w-4' alt='Delete' />
							</button>
						</div>
					)}
				</div>
			))}

			{todos.length === 0 && !showAddNew && <EmptyList />}
		</div>
	)
}

export default ListToDo
