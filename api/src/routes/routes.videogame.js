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
        const allVideogames = await getAllvideogames();
        res.status(200).json(allVideogames);
  
      } else {
        const allVgByName = await getVgByName(name);
  
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
        const vgFound = await getVgById(id);
  
        //!country, es error de usuario, no de codigo, por eso throw
        if (!vgFound) throw new Error(`${id} it's not a videogame code`);
        res.status(200).send(vgFound);
  
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.post('/create', checkDataCreateVG, async (req, res) => { //aplico middleware

  let { name, description, released, rating, platforms, genres, image} = req.body;

  try {

    //platform = platform.toString();
    const newVgame = await Videogame.create({
       name,
       description,
       released,
       rating,
       image, 
       platforms //ojo-- envio array!!!
    })

    let genresArray = [];
    const vg_genre = await Genre.findAll({ where:{name: genres} })
    
    for (let i = 0; i < vg_genre.length; i++) {
      genresArray.push(vg_genre[i].dataValues.id);
    }
    await newVgame.addGenre(genresArray);

    res.status(200).send(newVgame);

  } catch (error) {
    res.status(404).send(error.message);        
  }
  });


module.exports = router;