const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
const getVideogameFromDatabase = require('../handlers/getVideogameFromDatabase');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const uuidValidate = require('uuid-validate');
const { response } = require('../app');


const getVideogamesById = async ( req, res ) => {
    const { id } = req.params;
    console.log(id)
    if (!uuidValidate(id)) {
        try {
            const response = await axios.get(`${API_URL}/games/${id}?key=${API_KEY}`);
            let { name, description, background_image, released, rating, platforms, genres } = response.data;
            platforms = platforms.map( (platform) => {
                return {
                    name: platform.platform.name
                }}).map(obj => obj.name);
            genres = genres.map( (genre) => {
                return {
                    genre: genre.name
                }
            }).map(obj => obj.genre);
            // res.status(200).json( { id, name, description, background_image, released, rating, platforms })
            res.status(200).json({ id, name, description, background_image, released, rating, platforms, genres })
        } catch (error) {
            res.status(404).json('No existe el juego')
        }
    } else {
        if (uuidValidate(id)){ 
            const found = await getVideogameFromDatabase(id)
            
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json('No existe el juego')
            }
        } else res.status(404).json('Ingrese un ID válido')
    }
} 

module.exports = getVideogamesById