const axios = require('axios');

const { API_KEY } = process.env;
const {ALL_API_URL} = require('../URLs');
const { Genre, Videogame } = require("../db");

const {Op, where} = require('sequelize');


const getAllvideogames = async()=>{
    let pages = 0;
    let vgAllApi = [];
    let response = await axios.get(ALL_API_URL);

    while (pages < 6) {
        pages++;
  
        let vgTempApi = response.data.map(vg => {
            return {
                id: vg.id,
                name: vg.name,
                image: vg.image,
                description: vg.description,
                released: vg.released,
                rating: vg.rating,
                platforms: vg.platforms,
                genres: vg.genres.map(g => g.name)
            }
        })

        vgAllApi = [...vgAllApi, ...vgTempApi];
        response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
    }


    const vgFromDB = await Videogame.findAll({
        attributes: ['id', 'name', 'image', 'description', 'released','rating', 'platforms'],
        include: { model: Genre }
     
    })

    return [...vgAllApi, ...vgFromDB];
}


const getVgByName = async(name)=> { // ***ojo-- lower / upper case????

    let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    
    if (response.length > 15) response = response.slice(0,15); 
    
    let vgApi = response.data.map(vg => {
        return {
            id: vg.id,
            name: vg.name,
            image: vg.image,
            description: vg.description,
            released: vg.released,
            rating: vg.rating,
            platforms: vg.platforms,
            genres: vg.genres.map(g => g.name)
        }
    });

    const VgDB = await Videogame.findAll({
        where:{
            name:{
              [Op.iLike]: `%${name}%`
            }
          },
          include: Genre,
    });

    return [...vgApi, ...VgDB];
}


const getVgById = async(id)=> {

    if (!isNaN(id)) {

        let response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

        let vgApi = response.data.map(vg => {
            return {
                id: vg.id,
                name: vg.name,
                image: vg.image,
                description: vg.description,
                released: vg.released,
                rating: vg.rating,
                platforms: vg.platforms,
                genres: vg.genres.map(g => g.name)
            }
        });

        return vgApi;

    } else {
        const VgDB = await Videogame.findByPk(id, {
            include: Genre,
        })
        return VgDB;
    }
         
}

module.exports = {
    getAllvideogames,
    getVgByName,
    getVgById
}