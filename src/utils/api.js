import md5 from "crypto-js/md5";

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const API_URL = "https://gateway.marvel.com/v1/public/";

export async function fetchCharacters(offset=0,limit=20) {
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey).toString();
    
    const url = `${API_URL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        return resultado.data.results;
    } catch (error) {
        
    }
}

export async function buscarHeroe(nombre) {
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey).toString();
    const url= `${API_URL}characters?nameStartsWith=${nombre}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const heroe = resultado.data.results;
        
        return heroe;
    }catch(error){
        console.log(error);
    }
}
export async function fetchComics(offset=0,limit=20) {
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey).toString();
    const url = `${API_URL}comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
       
        return resultado.data.results;
    } catch (error) {
        
    }
}
export async function buscarComic(nombre) {
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey).toString();
    const url= `${API_URL}comics?titleStartsWith=${nombre}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const comic = resultado.data.results;
        return comic;
    }catch(error){
        console.log(error);
    }
}