const { Videogame, Genre, Platform } = require('../db');
const { v4: uuidv4 } = require('uuid');
const validator = require('./validator'); 

const createVideogame = async (req, res) => {
  const { name, description, platforms, background_image, released, rating, genres } = req.body;

  const newVideogame = Videogame.build({ id: uuidv4(), name, description, background_image, released, rating });

  const existingVideogame = await Videogame.findOne({ where: { name } });

  if (existingVideogame) {
    return res.status(202).json({ error: 'El videogame ya existe' });
  }

  const errors = validator(req.body); 

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  newVideogame.save();
  await newVideogame.setGenres(genres);
  await newVideogame.setPlatforms(platforms);

  res.status(201).json(newVideogame);
};

module.exports = createVideogame;