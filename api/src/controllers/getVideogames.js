const { Videojuego, Genero } = require('../db');
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://api.rawg.io/api';

// Función para obtener todos los videojuegos, si viene con ID, obtiene solo el juego del id solicitado


