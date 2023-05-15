const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

<<<<<<< HEAD
const { getAllVideogames, getVideogamesById, getVideogamesByName }= require('../controllers/index.js');
const createVideogame  = require('../handlers/createVideogame.js')
const getGenres = require('../handlers/getGenres.js');
const getPlatforms = require('../handlers/getPlatforms.js');
=======
const getVideogames = require('../controllers/getVideogamesactual.js');
>>>>>>> d9ac655165e82c4b19ff13b7dc8e3d2d38deaa66

const router = Router();

router.get('/videogames/name/', getVideogamesByName)
router.get("/videogames/", getAllVideogames)
router.get('/videogames/:id', getVideogamesById)
router.post('/videogames', createVideogame)
router.get('/genres', getGenres)
router.get('/platforms', getPlatforms)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
