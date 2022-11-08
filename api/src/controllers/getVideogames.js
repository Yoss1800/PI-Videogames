const axios = require('axios');

const { API_KEY } = process.env;
const {ALL_API_URL} = require('../URLs');
const { Genre, Videogame } = require("../db");

const {Op, where} = require('sequelize');


const getAllvideogames = async()=>{
    let pages = 0;
    let vgAllApi = [];
    let response = await axios.get(ALL_API_URL);
    //console.log(response);

    while (pages < 6) {
        pages++;
  
        let vgTempApi = response.data.results.map(vg => {
            return {
                id: vg.id,
                name: vg.name,
                image: vg.image,
                description: vg.description,
                released: vg.released,
                rating: vg.rating,
                platforms: vg.platforms.map(p => p.platform.name), //es un objeto dentro de objeto y extraigo array
                genres: vg.genres.map(g => g.name) //objeto y extraigo array
            }
        })
        //console.log(vgTempApi);

        vgAllApi = [...vgAllApi, ...vgTempApi];
        //console.log(vgAllApi);

         //vuelvo a llamar a la API con next - next es un link del objeto recibido (pagina)
        response = await axios.get(response.data.next)
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
    
    let vgApi = response.data.results.map(vg => {
        return {
            id: vg.id,
            name: vg.name,
            image: vg.image,
            description: vg.description,
            released: vg.released,
            rating: vg.rating,
            platforms: vg.platforms.map(p => p.platform.name),
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
        //console.log(response)

        //la respuesta es un objeto, en vez de map, filtro sencilllamente lo que quiero en vgapi

        const vg = response.data;

        let vgApi =  {
                id: vg.id,
                name: vg.name,
                image: vg.image,
                description: vg.description,
                released: vg.released,
                rating: vg.rating,
                platforms: vg.platforms.map(p => p.platform.name),
                genres: vg.genres.map(g => g.name)
        }

        console.log(vgApi)

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