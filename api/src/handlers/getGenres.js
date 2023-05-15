// Importamos los modelos de la base de datos, la librería axios para hacer requests y las variables de entorno.
const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');

// Controlador que obtiene los géneros de la base de datos o de la API externa en caso de que la base de datos esté vacía.

const getGenres = async (req, res) => {
    try {
        // Buscamos los géneros en la base de datos.
        let genres = await Genre.findAll();
        // Si la base de datos está vacía hacemos una petición a la API para obtener los géneros.
        if (genres.length === 0) {
            const response = await axios.get(`${API_URL}/genres?key=${API_KEY}`);
            const apiGenres = response.data.results;

            // Mapeamos los géneros obtenidos para que coincidan con el modelo de la base de datos.
            genres = apiGenres.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name
        };
        });
        // Insertamos los géneros en la base de datos.
        await Genre.bulkCreate(genres);
        }
        // Enviamos los géneros al cliente.
       // genres = genres.map(obj => obj.name);
        res.status(200).json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al obtener los géneros.' });
    }
}

// Exportamos el controlador.
module.exports = getGenres