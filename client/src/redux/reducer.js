import { 
    GET_ALL_VG, 
    GET_DETAIL, 
    GET_VG_NAME, 
    GET_GENRES, 
    POST_VG,  
    SORT_BY_NAME, 
    SORT_BY_RATING,
    FILTER_BY_GENRE,
    CLEAN_DETAIL } from "./actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: {}
}

const rootReducer = (state= initialState, action)=>{
    switch (action.type) {

        case GET_ALL_VG:
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload //lo guardo en 2 estados para tener siuempre en all todos y no depender del filtrado
            }
            
        case GET_VG_NAME:
            return {
                ...state,
                videogames: action.payload
            }

        case GET_DETAIL:
            //state.detail = {};
            return {
                ...state,
               detail: action.payload
            }

        case GET_GENRES:
            return{
                ...state,
                genres: action.payload,
            }

        case POST_VG:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
            }

        case SORT_BY_NAME:
            let sortdCardsName = action.payload === 'asc' ?
                //sort compara y pone der o izq del arreglo, dependiendo cual es mayor
                // si son iguales, 0 y queda igual
                state.videogames.sort(function(a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.videogames.sort(function(a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 1;
                })

            return {
                ...state,
                countries: sortdCardsName
            }

        case SORT_BY_RATING:
            let sortedCardsGenre = action.payload === 'rating-+' ?
                //sort compara y pone der o izq del arreglo, dependiendo cual es mayor
                // si son iguales, 0 y queda igual
                state.videogames.sort(function(a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                }) :
                state.videogames.sort(function(a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 1;
                })

            return {
                    ...state,
                    countries: sortedCardsGenre
                }   

        case FILTER_BY_GENRE:
            const allVideogames = state.allVideogames;
            //si la opc es allgenr, 
            //si mi payload es todo, me devolv es todo, y si no filtralo por al payload que te llega (action.payload)
            //hago dispatch en componente home
            const genreFiltered = action.payload === 'allGenre' ? allVideogames : allVideogames.filter(e => e.genres.includes(action.payload));
            return{
                ...state,
                videogames: genreFiltered
            }
        
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {}
            }
            
    
        default:
            return {...state}
    }
}

export default rootReducer;