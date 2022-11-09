import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVG, getGenres, sortByName, sortByRating, filterByGenre } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import PageBreaker from './PageBraker';
import SearchBar from './SearchBar';


export default function Home(){

    const dispatch = useDispatch();
    //useSelector: es un hook, lo mismo que usar mapStateToProps (declaro constante y pido traeme con useselector todo lo que esta en el estado de countries)
    
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);

       //DEFINIMNOS VARIOS ESTADOS LOCALES:
    //-A estado con la pag actual / B- estado que me setee la pagf actual
    const [currentPage, setCurrentPage] = useState(1); //guardame en estado local pag actual y una constante que me setee la pag actual
    const [vgPerPage, setVideogamesPerPage] = useState(10); //guardame cuantos paises quiero por pagina
    const indexOfLastVG = currentPage * vgPerPage; // nro de pag * cant de card por pag me da el ultimo card esto seria igual a 10
    const indexOfFirstVideogame = indexOfLastVG - vgPerPage; //0
    const currentVideogames =  allVideogames.slice(indexOfFirstVideogame, indexOfLastVG);   //Obtengo array con los cards entre ambos index
    const [sorted, setSorted] = useState('');//genero estado vacio.. en la fcn de ordenar, renderiza la primera pag

    const pageBreaker = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //despacho la accion de traer a los countries al estado - cada vez que se monta esta ruta, deberia usarse el use effect y actualizar todo
    // use effect es un hook de didmount y didupdate (en 2do parametro, array de dependencias).. maneja ambos
   
    useEffect (()=>{
        dispatch(getAllVG());
    },[dispatch]) // ese ultimo array, (Array de dependencias) se pone de lo que depende didmount del dispatch - si le paso en el array algo lo hace, si no no hace nada
    // cuando componente se actializa, esto se ejecuta
    // en array paso una variable, si esa variable cambia, se ejecuta useEffect ej: [var]
    //+ tengo que poner en el array, variables que sean externas a react - de estamanera, react controla la operatoria

    //Traigo generos al estado
    useEffect (()=>{
        dispatch(getGenres());
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllVG());
    };

    //creamos funcion para seleccionar el filtro de continent.. el e.target.,value, toma el valor del continente seleccionado
    function handlerFilterGenre(e){
        dispatch(filterByGenre(e.target.value));
    };
  
    function handlerSortCards(e){
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setSorted(`Sorted ${e.target.value}`); //renderiza la primera pag, modificando el estadio previamente declarado en la seccion de variables
    };

    function handlerSortCards(e){
        e.preventDefault();
        if (e.target.value === 'asc' || e.target.value === 'desc') {
            dispatch(sortByName(e.target.value));
            setCurrentPage(1);
            setSorted(`Sorted ${e.target.value}`); //renderiza la primera pag, modificando el estadio previamente declarado en la seccion de variables
        }
        if (e.target.value === 'rating-+' || e.target.value === 'rating+-') {
            dispatch(sortByRating(e.target.value));
            setCurrentPage(1);
            setSorted(`Sorted ${e.target.value}`); //renderiza la primera pag, modificando el estadio previamente declarado en la seccion de variables
        }
    };


 
    //renderizamos con el return
    return (
        <div>
            <Link to= '/create-videogame'>New Videogame</Link>
            <Link to= '/videogames'>All Videogames</Link>
            <h1>Esto es Home</h1>
        


            {/* aca hacemos los filtros:
            -el value dentro de la option, me permite acceder y preguntar: de acuerdo al value tomar una desicion / accion 
            si son mas opciones, podemos usar un map}

            {/* los values son los correspòndientes de la api o la DB */}
            <div>
                <select onChange={e => handlerFilterGenre(e)}> {/* cuando se selecciona, toma valor a filtrar */}
                    {allGenres.sort().map(e => {   /* ordeno, mapeo y genero opcion con genero */
                         return <option value={e}>{e}</option>
                    })} 
                </select>

                <select onChange={e => handlerSortCards(e)}>
                    <option value= 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                    <option value= 'rating-+'>Rating - +</option>
                    <option value= 'rating+-'>Rating + -</option>
                </select>

                <PageBreaker
                    vgPerPage = {vgPerPage}
                    allVideogames = {allVideogames.length}
                    pageBreaker = {pageBreaker}
                />

                <SearchBar/>

                {/* renderizo la card pais con el componente card: (paso props que quiero -chequear del estado global) 
                allcountries para todos los countries
                currentcountires apra los actuales de la pag*/}
                {currentVideogames?.map(v => {
                    return (
                        <div>
                        <Link to={`/videogames/${v.id}`}>   
                        <Card name={v.name} genres={v.genres} image={v.image}/>
                        </Link>
                        </div>
                    )      
                })
                }


            </div>
        </div>
    )   

}