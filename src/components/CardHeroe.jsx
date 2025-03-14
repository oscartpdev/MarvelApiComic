import React from 'react'

function CardHeroe({nombre,aparicion,imagen}) {
  return (
    <>
        <div className='bg-white p-4 m-4 rounded-lg shadow-md flex flex-col items-center'>
            <img className='w-60 h-60 ' src={imagen} alt="imagen de heroe" />
            <h1 className='text-center text-xl font-bold'>Nombre: {nombre}</h1>
            <p className='text-center text-sm'>Primera aparición: {aparicion}</p>
        </div>
    </>
  )
}

export default CardHeroe