import React, { useState, useEffect } from 'react';
import styles from './FormPage.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const [gameData, setGameData] = useState({
    name: '',
    image: '',
    description: '',
    platforms: [],
    releaseDate: '',
    rating: '',
    genres: []
  });

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar las validaciones que desees antes de enviar los datos

    // Ejemplo de impresión de los datos del juego
    console.log(gameData);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/genres/'); // Cambia la ruta según corresponda
        setGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/platforms/'); // Cambia la ruta según corresponda
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
    fetchPlatforms();
  }, []);

  return (
    <div className={styles.formPage}>
      <h2 className={styles.title}>Create New Game</h2>

      {/* Agregar el botón para volver a HomePage */}
      <Link to="/home" className={styles.backButton}>
        Volver a la página de inicio
      </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gameData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={gameData.image}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={gameData.description}
            onChange={handleChange}
            required
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Platforms:</label>
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
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="releaseDate" className={styles.label}>Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={gameData.releaseDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating" className={styles.label}>Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={gameData.rating}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Genres:</label>
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
        </div>
        <button type="submit" className={styles.button}>Create Game</button>
      </form>
    </div>
  );
};

export default FormPage;