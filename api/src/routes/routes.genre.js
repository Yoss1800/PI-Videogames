const {Router} = require("express");
const router = Router(); 

const morgan = require("morgan");
const { Genre, Videogame } =require("../db"); //importo modelos para usarlos
const { getGenres } =require('../controllers/getGenres');

const {Op, where} = require('sequelize');

router.use(morgan("dev"));

router.get("/genres", async (req, res) => {
    try {
        const allGenres = getGenres();
  
        if(allGenres.length > 0) {
          res.status(200).json(allGenres);
        }else{
        res.status(400).send('No genres in DB');
        }
      
    } catch (err) {
      res.status(400).send(err.message);
    }
});