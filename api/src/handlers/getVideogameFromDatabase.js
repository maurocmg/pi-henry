const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const API_URL = 'https://api.rawg.io/api';
const express = require('express');

const getVideogameFromDatabase = async (id) => {
    const response = await Videogame.findByPk(id)
    return response
}

module.exports = getVideogameFromDatabase
