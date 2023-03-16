import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVG, getGenres, sortByName, sortByRating, filterByGenre, filterCreated } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import PageBreaker from './PageBraker';
import SearchBar from './SearchBar';
import Nav from './Nav';
import styles from './Home.module.css'
import loader from '../img/loader.gif'


export default function Home(){

    const dispatch = useDispatch();
    //useSelector: es un hook, lo mismo que usar mapStateToProps (declaro constante y pido traeme con useselector todo lo que esta en el estado de countries)
    
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);

    const allGenresArray = allGenres.map(g => g.name);
    //console.log(allGenresArray);
    //console.log(allVideogames)

       //DEFINIMNOS VARIOS ESTADOS LOCALES:
    //-A estado con la pag actual / B- estado que me setee la pagf actual
    const [currentPage, setCurrentPage] = useState(1); //guardame en estado local pag actual y una constante que me setee la pag actual
    const [vgPerPage, setVideogamesPerPage] = useState(15); //guardame cuantos paises quiero por pagina
    const indexOfLastVG = currentPage * vgPerPage; // nro de pag * cant de card por pag me da el ultimo card esto seria igual a 10
    const indexOfFirstVG = indexOfLastVG - vgPerPage; //0
    const currentVG =  allVideogames.slice(indexOfFirstVG, indexOfLastVG);   //Obtengo array con los cards entre ambos index
    const [sorted, setSorted] = useState('');//genero estado vacio.. en la fcn de ordenar, renderiza la primera pag

    const pageBreaker = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //despacho la accion de traer a los countries al estado - cada vez que se monta esta ruta, deberia usarse el use effect y actualizar todo
    // use effect es un hook de didmount y didupdate (en 2do parametro, array de dependencias).. maneja ambos
   
    useEffect (()=>{
        if(!allVideogames.length) { //si en el estado de videogames no hay nada, hace esto
        dispatch(getAllVG());
        }
    },[dispatch]) // ese ultimo array, (Array de dependencias) se pone de lo que depende didmount del dispatch - si le paso en el array algo lo hace, si no no hace nada
    // cuando componente se actializa, esto se ejecuta
    // en array paso una variable, si esa variable cambia, se ejecuta useEffect ej: [var]
    //+ tengo que poner en el array, variables que sean externas a react - de estamanera, react controla la operatoria

    //Traigo generos al estado
    useEffect (()=>{
        dispatch(getGenres());
    },[dispatch])

    /* const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllVG());
    }; */

    //creamos funcion para seleccionar el filtro de genero.. el e.target.,value, toma el valor del continente seleccionado
    function handlerFilterGenre(e){
        dispatch(filterByGenre(e.target.value));
    };

    function handlerFilterCreated(e){
        dispatch(filterCreated(e.target.value));
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
        <div className={styles.homeMainDiv}>
            <Nav />
            <SearchBar />
        <div className={styles.contentDiv}>
            {/* aca hacemos los filtros:
            -el value dentro de la option, me permite acceder y preguntar: de acuerdo al value tomar una desicion / accion 
            si son mas opciones, podemos usar un map}

            {/* los values son los correspòndientes de la api o la DB */}
            
                <select className={styles.select} onChange={e => handlerFilterGenre(e)}> {/* cuando se selecciona, toma valor a filtrar */}                   
                <option value= 'allGenre'>All Genres</option>
                    {allGenresArray.sort().map(g => {
                    return <option value={g}>{g}</option>})} 
                </select>

                <select className={styles.select} onChange={e => handlerSortCards(e)}>
                    <option value= 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                    <option value= 'rating-+'>Rating - +</option>
                    <option value= 'rating+-'>Rating + -</option>
                </select>

                <select className={styles.select} onChange={e => handlerFilterCreated(e)}>
                    <option value= 'All'>All Games</option>
                    <option value= 'created'>Created</option>
                    <option value= 'api'>Data Base</option>
                </select>
            
        <div className={styles.cards}>
                {/* renderizo la card pais con el componente card: (paso props que quiero -chequear del estado global) 
                allcountries para todos los countries
                currentcountires apra los actuales de la pag*/}

                {/* no hay vg, mostra las cartas, sino, mostra el cargando */}
                {currentVG?.length ? (
                currentVG?.map((v) => (
                    <Link to={`/videogames/${v.id}`} className={styles.link}>   
                        <Card name={v.name} genres={v.genres} image={v.image}/>
                    </Link>
                ))
                ) : typeof currentVG === "string" ? ( //si recibe error como respuesta
                    <div>
                        not found - error 404
                    </div>
                ) : (
                    <div>
                    <img className={styles.loader} src={loader} alt=""></img>
                    </div>
                )}
        </div>

        <div className={styles.pageBreaker}>
        <PageBreaker
                    vgPerPage = {vgPerPage}
                    allVideogames = {allVideogames?.length}
                    pageBreaker = {pageBreaker}
                />
        </div>

        </div>
        </div>
    )   

}