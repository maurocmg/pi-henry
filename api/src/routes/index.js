const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getVideogames = require('../controllers/getVideogames.js');

const router = Router();

router.get("/videogames", getVideogames)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
