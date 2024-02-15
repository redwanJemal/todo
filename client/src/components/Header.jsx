/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../assets/todo-logo.svg'

const Header = () => {
	return (
		<div className='flex justify-center'>
			<header className='flex gap-2 bg-gray-600 rounded-md px-4 py-2 items-center'>
				<img src={logo} className='w-5 h-5' alt='' />
				<span className='text-white text-lg font-bold'>My ToDo App</span>
			</header>
		</div>
	)
}

export default Header
