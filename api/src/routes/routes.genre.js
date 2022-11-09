const {Router} = require("express");
const router = Router(); 

const morgan = require("morgan");
const { Genre, Videogame } =require("../db"); //importo modelos para usarlos
const { getGenres } =require('../controllers/getGenres');

const {Op, where} = require('sequelize');

router.use(morgan("dev"));

router.get("/", async (req, res) => {
    try {
        const allGenres = await getGenres();
  
        if(allGenres.length > 0) {
          res.status(200).json(allGenres);
        }else{
        res.status(400).send('No genres in DB');
        }
      
    } catch (err) {
      res.status(400).send(err.message);
    }
});

module.exports = router;