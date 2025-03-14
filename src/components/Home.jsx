import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import { fetchCharacters, buscarHeroe } from '../utils/api'
import CardHeroe from './CardHeroe'
function Home() {
    const [personajes, setPersonajes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPersonajes = async () => {
            setLoading(true);
            const personajes = await fetchCharacters(offset, limit);
            personajes.forEach(personaje => {
                if (personaje.comics.items.length === 0) {
                    personaje.ultimoComic = 'No hay comics';
                    return;
                }
                const ultimoComic = personaje.comics.items[personaje.comics.items.length - 1].name;
                personaje.ultimoComic = ultimoComic;
            });

            setPersonajes(personajes);
            setLoading(false);
        }
        getPersonajes();
    }, [offset, limit])

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.buscador.value;


        const getHeroe = async () => {
            const personajes = await buscarHeroe(nombre);
            
            personajes.forEach(personaje => {
                if (personaje.comics.items.length === 0) {
                    personaje.ultimoComic = 'No hay comics';
                    return;
                }
                const ultimoComic = personaje.comics.items[personaje.comics.items.length - 1].name;
                personaje.ultimoComic = ultimoComic;
            });
            setPersonajes(personajes);
        }
        getHeroe(personajes);
    }

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    const handlePrev = () => {
        setOffset(prevOffset => Math.max(prevOffset - limit, 0)); // Retroceder sin pasar a números negativos
    };

    return (
        <>
            <Header />
            <main className='bg-gray-300 p-6'>
                <h1 className='text-4xl text-center '>Bienvenido a la Api de Marvel Comics</h1>
                <h2 className='text-2xl text-center m-3'>Use el Buscador para buscar lo que necesite o quiera</h2>
                <form action="" className='flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
                    <label htmlFor="buscador" className="text-xl font-semibold mb-2 text-gray-700">Inserte algo a Buscar</label>

                    <div className="flex items-center space-x-3 mb-4">
                        <input
                            className='border-2 border-blue-600 px-4 py-2 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out'
                            type="text"
                            name='buscador'
                            placeholder='Ej. Spider-Man'
                        />
                        <button type="submit"className='bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out'>Buscar</button>
                    </div>
                </form>

                <h1 className='text-2xl text-center m-6'>Se muestran unas tarjetas de personajes aqui</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
                            <span className="sr-only">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {personajes.map((personaje) => (
                            <CardHeroe key={personaje.id} imagen={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`} nombre={personaje.name} aparicion={personaje.ultimoComic} />
                        ))}
                    </div>
                )}

                <div className="pagination-buttons flex justify-center space-x-4 mt-4">
                    <button className='bg-amber-300 p-3 border-2 rounded-2xl' onClick={handlePrev} disabled={offset === 0}>Anterior</button>
                    <button className='bg-amber-300 p-3 border-2 rounded-2xl' onClick={handleNext}>Siguiente</button>
                </div>
            </main>





            <Footer />
        </>


    )
}

export default Home