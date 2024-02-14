/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import cancelImg from '../assets/cancel.svg'
import searchImg from '../assets/search.svg'

const SearchToDo = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [hasSearched, setHasSearched] = useState(false)

	const search = () => {
		onSearch(searchTerm)
		setHasSearched(true)
	}

	const cancelSearch = () => {
		if (searchTerm) {
			setSearchTerm('')
			if (hasSearched) {
				onSearch('')
				setHasSearched(false)
			}
		} else {
			console.log('nothing to cancel')
		}
	}

	return (
		<div className='mt-4 flex items-center'>
			<label htmlFor='voice-search' className='sr-only'>
				Search
			</label>
			<div className='relative w-full'>
				<input
					type='text'
					id='voice-search'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Search Todos'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					required
				/>
				{searchTerm && (
					<button
						onClick={cancelSearch}
						type='button'
						className='absolute inset-y-0 end-0 flex items-center pe-3'
					>
						<img src={cancelImg} className='w-4' alt='cancel' />
					</button>
				)}
			</div>
			<button
				type='submit'
				onClick={search}
				className='inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
			>
				<img src={searchImg} className='w-4 mr-2' alt='Search' />
				Search
			</button>
		</div>
	)
}

export default SearchToDo
