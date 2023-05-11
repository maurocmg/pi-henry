const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const API_URL = 'https://api.rawg.io/api';

// Controller para obtener todos los videogames de API
// Hacemos petición a la API, y luego por cada juego recibido extraemos las propiedades que nos interesan. En el caso de platforms, también dejamos solo el nombre de las mismas. Pendiente de implementar mensaje de error.

const getVideogames = async (req, res) => {
    try {
        
        const response = await axios.get(`${API_URL}/games?key=${API_KEY}`); 
        const videogames = response.data.results.map( (game) => {
            return { 
                id: game.id, 
                name: game.name, 
                description: game.description,
                image: game.background_image,
                released: game.released,
                rating: game.rating, 
                platforms: game.platforms.map( (platform) => {
                    return {
                        name: platform.platform.name
                    }
                })
            }
        });
        res.status(200).json({videogames})
    } catch (error) {
        res.status(500).json('{message : errormessage}')
    }
}

module.exports = getVideogames; 
    

