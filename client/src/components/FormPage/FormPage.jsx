import React, { useState, useEffect } from 'react';
import styles from './FormPage.module.css';
import { Link } from 'react-router-dom';
import { getGenres, getPlatforms } from './utils';
import { validator } from './validator';
import axios from 'axios'; 
import Card from '../Card/Card'; 




const FormPage = () => {
  const [gameData, setGameData] = useState({
    name: '',
    background_image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: []
  });

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [errors, setErrors] = useState({});
  const [createdVideogame, setCreatedVideogame] = useState(null); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  
    const formErrors = validator({
      ...gameData,
      [name]: value
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: formErrors[name]
    }));
  };

  const handlePlatformsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGameData((prevData) => ({
        ...prevData,
        platforms: [...prevData.platforms, parseInt(value)]
      }));
    } else {
      setGameData((prevData) => ({
        ...prevData,
        platforms: prevData.platforms.filter((platform) => platform !== parseInt(value))
      }));
    }
  
    const formErrors = validator({
      ...gameData,
      platforms: checked
        ? [...gameData.platforms, parseInt(value)]
        : gameData.platforms.filter((platform) => platform !== parseInt(value))
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      platforms: formErrors.platforms
    }));
  };
  
  const handleGenresChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGameData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, parseInt(value)]
      }));
    } else {
      setGameData((prevData) => ({
        ...prevData,
        genres: prevData.genres.filter((genre) => genre !== parseInt(value))
      }));
    }
  
    const formErrors = validator({
      ...gameData,
      genres: checked
        ? [...gameData.genres, parseInt(value)]
        : gameData.genres.filter((genre) => genre !== parseInt(value))
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      genres: formErrors.genres
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validator(gameData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3001/videogames", gameData);

        if (response.status === 201) {
          const newVideogame = response.data;
          setCreatedVideogame(newVideogame); 
          setGameData({
            name: '',
            background_image: '',
            description: '',
            platforms: [],
            released: '',
            rating: '',
            genres: []
          });         
        } else if (response.status === 202) {
          window.alert('El videojuego ya existe!');
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const genresData = await getGenres();
      const platformsData = await getPlatforms();

      setGenres(genresData);
      setPlatforms(platformsData);
    };

    getData();
  }, []);

  return (
    <div className={styles.formPage}>
      <h2 className={styles.title}>Crear nuevo Videogame</h2>

      <Link to="/home" className={styles.backButton}>
        Volver a la página de inicio
      </Link>
      <form onSubmit={handleSubmit} className={styles.form}>

      {createdVideogame ? ( 
          <div className={styles.successMessage}>
            <p>Nuevo videojuego creado!</p>
            <div className={styles.cardContainer}>
              <Card game={createdVideogame} />
            </div>  
          </div>
        // ) : errors.postError ? (
        //   <div className={styles.successMessage}>
        //     <p>{errors.postError}</p>
        //   </div>
        ) : null}

        <div className={styles.formGroup}>
        <label htmlFor="name" className={`${styles.label} ${errors.name && styles.errorLabel}`}>
          Nombre:
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </label>
          <input
            type="text"
            id="name"
            name="name"
            value={gameData.name}
            onChange={handleChange}
            // required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
        <label htmlFor="background_image" className={`${styles.label} ${errors.background_image && styles.errorLabel}`}>
            URL de imagen:
            {errors.background_image && <span className={styles.errorMessage}>{errors.background_image}</span>}
        </label>
          <input
            type="text"
            id="background_image"
            name="background_image"
            value={gameData.background_image}
            onChange={handleChange}
            // required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
        <label htmlFor="description" className={`${styles.label} ${errors.description && styles.errorLabel}`}>
            Descripción:
            {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
        </label>
          <textarea
            id="description"
            name="description"
            value={gameData.description}
            onChange={handleChange}
            // required
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Plataformas:</label>
          <div className={styles.checkboxGroup}>
          {platforms.map((platform) => (
            <label key={platform.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="platforms"
                value={platform.id}
                checked={gameData.platforms.includes(platform.id)}
                onChange={handlePlatformsChange}
                className={styles.checkbox}
              />
              {platform.name}
            </label>
          ))}
          </div>
          {errors.platforms && <span className={styles.errorMessage}>{errors.platforms}</span>}
        </div>
        <div className={styles.formGroup}>
        <label htmlFor="released" className={`${styles.label} ${errors.released && styles.errorLabel}`}>
            Fecha de lanzamiento:
            {errors.released && <span className={styles.errorMessage}>{errors.released}</span>}
        </label>
          <input
            type="text"
            id="released"
            name="released"
            value={gameData.released}
            onChange={handleChange}
            // required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating" className={`${styles.label} ${errors.rating && styles.errorLabel}`}>
            Rating:
            {errors.rating && <span className={styles.errorMessage}>{errors.rating}</span>}
          </label>
          <input
            type="text" 
            id="rating"
            name="rating"
            value={gameData.rating}
            onChange={handleChange}
            // required
            className={styles.input}
          />
          {/* <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={gameData.rating}
            onChange={handleChange}
            required
            className={styles.input}
          /> */}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Géneros:</label>
          <div className={styles.checkboxGroup}>
          {genres.map((genre) => (
            <label key={genre.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="genres"
                value={genre.id}
                checked={gameData.genres.includes(genre.id)}
                onChange={handleGenresChange}
                className={styles.checkbox}
              />
              {genre.name}
            </label>
          ))}
          </div>
        {errors.genres && <span className={styles.errorMessage}>{errors.genres}</span>}
        </div>
        <button type="submit" className={styles.button}>Crear Videogame</button>
      </form>
    </div>
  );
};

export default FormPage;