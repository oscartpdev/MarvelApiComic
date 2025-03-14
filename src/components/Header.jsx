import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <>
        <header className='bg-blue-800 text-white p-6'>
            <nav className='flex justify-evenly text-2xl text-white'>
                <Link to={"/"} className='hover:text-gray-300'>Personajes</Link>
                <Link to={"/comics"} className='hover:text-gray-300'>Comics</Link>
            </nav>
        </header>
    </>
  )
}

export default Header