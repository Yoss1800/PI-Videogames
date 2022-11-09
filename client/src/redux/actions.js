import axios from 'axios'

//redux-thunk: sirve para permitirnos esta llamada asincrona a la DB

export const GET_ALL_VG = "GET_ALL_VG";
export const GET_DETAIL = "GET_DETAIL";
export const GET_VG_NAME = "GET_VG_NAME";
export const GET_GENRES = "GET_GENRES";
export const POST_VG = "POST_VG";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const CLEAN_DETAIL = "CLEAN_DETAIL";


//traigo los VG de la DB - CONECTO CON BACK - Return al dispatch?
//aca, en actions tengo que hacer todos los llamados a la DB o API

export function getAllVG() {
    return async (dispatch) => {
      const res = await axios.get("http://localhost:3001/videogames");
      dispatch({ type: GET_ALL_VG, payload: res.data });
    };
}


//en lo posible, la logica ponerla en reducer, no en actions-.

export function getVgByName(name) {
    return async function (dispatch) {
      try {
        var res = await axios.get (`http://localhost:3001/videogames?name=${name}`);
        return dispatch ({ type: GET_VG_NAME, payload: res.data });
      } catch (error) {
        console.log(error);
      } 
    }
}


export function getDetail(id){
    return async function (dispatch) {
        try {
          var res = await axios.get (`http://localhost:3001/videogames/${id}`);
          return dispatch ({ type: GET_DETAIL, payload: res.data });
        } catch (error) {
          console.log(error);
        } 
    }
}


export function getGenres() {
    return async (dispatch) => {
      const res = await axios.get("http://localhost:3001/genres");
      dispatch({ type: GET_GENRES, payload: res.data });
    };
}


export function postVG(payload) {
    return async (dispatch) => {
      const res = await axios.post("http://localhost:3001/videogames/create", payload);
      dispatch({ type: POST_VG, payload: res.data });
    };
}


export function sortByName(payload){
  return {
    type: SORT_BY_NAME,
    payload
  }
}


export function sortByRating(payload){
  return {
    type: SORT_BY_RATING,
    payload
  }
}


export function filterByGenre(payload){
  return {
    type: FILTER_BY_GENRE,
    payload
  }
}


export function cleanDetail() {
    return {
      type: CLEAN_DETAIL
    }
}
