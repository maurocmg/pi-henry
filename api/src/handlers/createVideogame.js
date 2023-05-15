const { Videogame, Genre, Platform } = require('../db');
const { v4: uuidv4 } = require('uuid');


const createVideogame = async (req, res) => {
    
    const { name, description, platforms, background_image, released, rating, genres } = req.body;
    //res.status(200).json({ name, description, platforms, background_image, released, rating, genres })
    const newVideogame = Videogame.build({ id: uuidv4(), name, description, background_image, released, rating })

    const genreIds = await Genre.findAll({ where: { name: genres } });
    const platformIds = await Platform.findAll({ where: { name: platforms } })

    newVideogame.save()

    genreIds.map(genre => genre.id)
    platformIds.map(platform => platform.id);

    await newVideogame.setGenres(genreIds);
    await newVideogame.setPlatforms(platformIds);

    // const genrePromises = genres.map(name => {
    //     return Genre.findOrCreate({ where: name });
    //   });
    //   const platformPromises = platforms.map(name => {
    //     return Platform.findOrCreate({ where: name });
    //   });

    // Promise.all([...genrePromises, ...platformPromises]).then(results => {
    //     const genres = results.slice(0, genrePromises.length);
    //     const platforms = results.slice(genrePromises.length);   
    //     newVideogame.addGenres(genres);
    //     newVideogame.addPlatforms(platforms);}    
    
    // platforms.forEach(element => {
    //     Platform.findAll( { where: { name: element } } ).then(
    //         platform => {
    //             newVideogame.addPlatforms(platform)
    //         }
    //     ).catch(error => console.log(error)) 
    // });

    // genres.forEach(element => {
    //     Genre.findAll( { where: { name: element } } ).then(
    //         genre => {
    //             newVideogame.addGenres(genre)
    //         }
    //     ).catch(error => console.error(error))
    // });
   
    res.status(201).json(newVideogame)
}
module.exports = createVideogame;