const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';

// Controller para obtener todos los videogames de API
// Hacemos petición a la API, y luego por cada juego recibido extraemos las propiedades que nos interesan. En el caso de platforms, también dejamos solo el nombre de las mismas. Pendiente de implementar mensaje de error.

const getAllVideogames = async (req, res) => {
    //const idreq = rObject.keys(req.params)[0]
    //const { id } = req.params;
    // const { name } = req.query;
    // console.log(name)
    // if ( name ) res.status(200).json(name) 
    // else res.status(500).json('bla')
    // if (id) {
    //     try {
    //         const response = await axios.get(`${API_URL}/games/${id}?key=${API_KEY}`);
    //         const { name, description, background_image, released, rating, platforms } = response.data;
    //         cleanplatforms = platforms.map( (platform) => {
    //             return {
    //                 name: platform.platform.name
    //             }});
    //         // res.status(200).json( { id, name, description, background_image, released, rating, platforms })
    //         res.status(200).json({ id, name, description, background_image, released, rating, cleanplatforms })
    //     } catch (error) {
    //         res.status(500).json('{message : errormessage}')
    //     }
    // } else {
        let videogames = []
        let i = 1
        try {        
            while (i <= 5) {
                let response = await axios.get(`${API_URL}/games?key=${API_KEY}&page_size=20&page=${i}`); 
                let partial = response.data.results.map( (game) => {                
                    return { 
                        id: game.id, 
                        name: game.name, 
                        description: game.description,
                        background_image: game.background_image,
                        released: game.released,
                        rating: game.rating, 
                        platforms: game.platforms.map( (platform) => {
                            return {
                                name: platform.platform.name
                            }
                        }).map(obj => obj.name),
                        genres: game.genres.map( (genre) => {
                             return {
                                 genre: genre.name
                             }
                        }).map(obj => obj.genre) 
                    }
                });

            videogames = [...videogames, ...partial]
            // console.log(i)
            i++
            }
            const allfromDatabase = await getVideogameFromDatabase()
            videogames = [...videogames, ...allfromDatabase]


            res.status(200).json({videogames})
        } catch (error) {
            res.status(500).json({message : error})
        }
    }

// }

module.exports = getAllVideogames; 
    

