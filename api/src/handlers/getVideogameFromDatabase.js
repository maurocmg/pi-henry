const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');

const getVideogameFromDatabase = async (id = null) => {
    
    let options = {
        include: [
          {
            model: Genre,
            attributes: ['name'], // Selecciona solo el atributo "name" del modelo Genre
            through: { attributes: [] }, // No incluir atributos adicionales de la tabla de enlace
          },
          {
            model: Platform,
            attributes: ['name'], // Selecciona solo el atributo "name" del modelo Platform
            through: { attributes: [] }, // No incluir atributos adicionales de la tabla de enlace
          },
        ],
      };

    if (id) {
        const response = await Videogame.findByPk(id, options)
        return response
    } else {
        const response = await Videogame.findAll(options)
        return response
    }

}

module.exports = getVideogameFromDatabase
