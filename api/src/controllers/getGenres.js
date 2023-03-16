const axios = require('axios');

const { API_KEY } = process.env;
const {ALL_GENRES_API} = require('../URLs');
const { Genre, Videogame } = require("../db");


//traigo todo desde la api y lo mando a la DB

function fetchAllGenresfromAPI(){
    
    axios.get(`${ALL_GENRES_API}`)
        .then(response => response.data.results)
        .then(data => {
            let allGenresFromAPI = data.map(g => {
                return {
                    name: g.name
                }         
            }) 
            return Genre.bulkCreate(allGenresFromAPI);
        })
        .then(()=> console.log('Genres added to DB'))
        .catch(err=>console.log(err))        
}

//traigo generos de la DB al front
const getGenres = async() => {
    const genresDB = await Genre.findAll({
        attributes: ['id', 'name'],   
    })

    return genresDB;
}


module.exports = {
    fetchAllGenresfromAPI,
    getGenres
}