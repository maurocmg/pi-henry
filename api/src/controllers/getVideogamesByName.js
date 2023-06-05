const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');
const getVideogameFromDatabase = require('../handlers/getVideogameFromDatabase'); // Importa la función


const getVideogamesByName = async (req, res) => {

    const { name } = req.query;
    // const pattern = name
    // // console.log(req.query);
    console.log(name)
    // res.status(200).json('name')

    try {
        const response = await axios.get(`${API_URL}/games?search=${name}&page_size=15&key=${API_KEY}`);
        const apiGames = response.data.results.map(game => {
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
                genres: game.genres?.map( (genre) => {
                     return {
                         genre: genre.name
                     }
                }).map(obj => obj.genre) 
            }
        })

      //  console.log(response)
        const gamesDatabase = await getVideogameFromDatabase(null, name); // Obtén los juegos de la base de datos
      //  console.log(gamesDatabase)
        const allGames = [...apiGames, ...gamesDatabase]; // Combina los juegos de la API y de la base de datos

        if (allGames.length === 0) {
            return res.status(404).json({ message: 'No se encontraron resultados para la búsqueda realizada.' });
          }
        res.status(200).json(allGames)    
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

module.exports = getVideogamesByName;