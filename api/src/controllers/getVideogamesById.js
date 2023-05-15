const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
const getVideogameFromDatabase = require('../handlers/getVideogameFromDatabase');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const uuidValidate = require('uuid-validate');


const getVideogamesById = async ( req, res ) => {
    const { id } = req.params;
    console.log(id)
    if (parseInt(id.toString())) {
        try {
            const response = await axios.get(`${API_URL}/games/${id}?key=${API_KEY}`);
            const { name, description, background_image, released, rating, platforms } = response.data;
            cleanplatforms = platforms.map( (platform) => {
                return {
                    name: platform.platform.name
                }});
            // res.status(200).json( { id, name, description, background_image, released, rating, platforms })
            res.status(200).json({ id, name, description, background_image, released, rating, cleanplatforms })
        } catch (error) {
            res.status(500).json('error en axios')
        }
    } else {
        const search = id.slice(1, -1)
        if (uuidValidate(id)){ 
            const found = async (id) => { 
                await getVideogameFromDatabase(id)
            }
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json('No existe el juego')
            }
        } else res.status(404).json('Ingrese un ID válido')
    }
} 

module.exports = getVideogamesById