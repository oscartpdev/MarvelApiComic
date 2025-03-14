import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react'
import { fetchComics,buscarComic } from '../utils/api'
import CardComic from './CardComic'
function Comics() {
    const [comics,setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getComics = async () => {
            setLoading(true);
            const comics = await fetchComics(offset,limit);
            comics.forEach(comic => {
                for(let i = 0; i < comic.prices.length; i++){
                    if(comic.prices[i].type === 'printPrice'){
                        if(comic.prices[i].price === 0){
                            comic.ultimoComic = 'No hay precio registrado';
                            break;
                        }
                        comic.ultimoComic = comic.prices[i].price;
                        break;
                    }
                }
            });
            setComics(comics);
            setLoading(false);
        }
        getComics();
    }, [offset,limit])


    const handleNext = () => {
        setOffset(prevOffset => prevOffset + 20);
    };
    const handlePrev = () => {
        setOffset(prevOffset=>Math.max(prevOffset - limit,0));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.buscador.value;
        const getComic = async () => {
            const comics = await buscarComic(nombre);
            comics.forEach(comic => {
                for(let i = 0; i < comic.prices.length; i++){
                    if(comic.prices[i].type === 'printPrice'){
                        if(comic.prices[i].price === 0){
                            comic.ultimoComic = 'No hay precio registrado';
                            break;
                        }
                        comic.ultimoComic = comic.prices[i].price;
                        break;
                    }
                }
            });
            setComics(comics);
        }   
        getComic(comics);
    }
  return (
    <>
        <Header/>
        <main className='bg-gray-300 p-6'>
            <h1 className='text-4xl text-center'>Comics</h1>
            <h2 className='text-2xl text-center m-3'>Use el Buscador para buscar lo que necesite o quiera</h2>
            <form action="" className='flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
                    <label htmlFor="buscador" className="text-xl font-semibold mb-2 text-gray-700">Inserte algo a Buscar</label>

                    <div className="flex items-center space-x-3 mb-4">
                        <input
                            className='border-2 border-blue-600 px-4 py-2 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out'
                            type="text"
                            name='buscador'
                            placeholder='Ej. Ultimate'
                        />
                        <button type="submit"className='bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out'>Buscar</button>
                    </div>
                </form>
                <h1 className='text-2xl text-center m-6'>Se muestran unas tarjeta de comics aqui</h1>
        {loading ? (
            <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
                ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {comics.map((comic) => (
                    <CardComic key={comic.id} imagen={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} nombre={comic.title} precio={comic.ultimoComic} />
                ))}
                </div>
        )}
         <div className="pagination-buttons flex justify-center space-x-4 mt-4">
         <button className='bg-amber-300 p-3 border-2 rounded-2xl' onClick={handlePrev} disabled={offset === 0}>Anterior</button>
         <button className='bg-amber-300 p-3 border-2 rounded-2xl' onClick={handleNext}>Siguiente</button>
        </div>
        </main>
        

        <Footer/>
    </>
  )
}

export default Comics