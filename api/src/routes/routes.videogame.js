const {Router} = require("express");
const router = Router(); 

const morgan = require("morgan");
const { Genre, Videogame } = require("../db"); //importo modelos para usarlos
const { getAllvideogames, getVgByName, getVgById } = require('../controllers/getVideogames'); //importo controllers
const checkDataCreateVG = require('../middlewares/checkData'); //midleware


const {Op, where} = require('sequelize');

router.use(morgan("dev"));


router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
  
      if(!name) {
        const allVideogames = getAllvideogames();
        res.status(200).json(allVideogames);
  
      } else {
        const allVgByName = getVgByName(name);
  
        if(allVgByName.length > 0) {
          res.status(200).json(allVgByName);
        }else{
        res.status(400).send(`${name} it's not a videogame name`);
        }
      }
      
    } catch (err) {
      res.status(400).send(err.message);
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vgFound = getVgById(id);
  
        //!country, es error de usuario, no de codigo, por eso throw
        if (!vgFound) throw new Error(`${id} it's not a videogame code`);
        res.status(200).send(vgFound);
  
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.post('/create', checkDataCreateVG, async (req, res) => { //aplico middleware
    try {
        const { name, image, description, released, rating, platforms, genres } = req.body;
        const newVg = await Videogame.create({
            name,
            image,
            description,
            released,
            rating,
            platforms, // ojo ver como recibo la data - necesito quizas pasar a string

        });

        // genero link entre genero y video game:
        await gameCreated[0].setGenres(genres); // relaciono ID genres al juego creado

        res.status(200).send('Videogame created successfully!');

    } catch (error) {
        res.status(404).send(error.message);        
    }
});





  module.exports = router;