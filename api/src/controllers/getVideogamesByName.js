const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');

const getVideogamesByName = async (req, res) => {

    const { name } = req.query;
    // const pattern = name
    // // console.log(req.query);
    console.log(name)
    // res.status(200).json('name')

    try {
        const response = await axios.get(`${API_URL}/games?search=${name}&page_size=15&key=${API_KEY}`);
        const games = response.data.results.map(game => {
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
                })
            }
        })
        if (games.length === 0) {
            return res.status(404).json({ message: 'No se encontraron resultados para la búsqueda realizada.' });
          }
        res.status(200).json(games)    
    } catch (error) {
        res.status(500).json('la cagaste wey')
    }

}

module.exports = getVideogamesByName;