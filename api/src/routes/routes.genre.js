const {Router} = require("express");
const router = Router(); 

const morgan = require("morgan");
const { Genre, Videogame } = require("../db"); //importo modelos para usarlos
const {Op, where} = require('sequelize');

router.use(morgan("dev"));