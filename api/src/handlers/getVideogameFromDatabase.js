const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');
const { Op } = require('sequelize');


const getVideogameFromDatabase = async (id = null, name = null) => {
  let options = {
    include: [
      {
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] },
      },
      {
        model: Platform,
        attributes: ['name'],
        through: { attributes: [] },
      },
    ],
  };

  if (id) {
    const response = await Videogame.findByPk(id, options);
    return formatVideogame(response);
  } else if (name) {
    const response = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      ...options
    });
    const formattedVideogames = response?.map((videogame) => formatVideogame(videogame));
    return formattedVideogames;
  } else {
    const response = await Videogame.findAll(options);
    const formattedVideogames = response?.map((videogame) => formatVideogame(videogame));
    return formattedVideogames;
  }
};

const formatVideogame = (videogame) => {
  const formattedPlatforms = videogame.platforms.map((platform) => platform.name);
  const formattedGenres = videogame.genres.map((genre) => genre.name);

  return {
    ...videogame.toJSON(),
    platforms: formattedPlatforms,
    genres: formattedGenres,
  };
};

module.exports = getVideogameFromDatabase;
