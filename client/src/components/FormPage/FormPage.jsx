import React, { useState } from 'react';
import styles from './FormPage.module.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePlatformsChange = (e) => {
    const selectedPlatforms = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setGameData((prevData) => ({
      ...prevData,
      platforms: selectedPlatforms
    }));
  };

  const handleGenresChange = (e) => {
    const selectedGenres = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setGameData((prevData) => ({
      ...prevData,
      genres: selectedGenres
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar las validaciones que desees antes de enviar los datos

    // Ejemplo de impresión de los datos del juego
    console.log(gameData);
  };

  return (
    <div className={styles.formPage}>
      <h2 className={styles.title}>Create New Game</h2>
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
          <label htmlFor="platforms" className={styles.label}>Platforms:</label>
          <select
            id="platforms"
            name="platforms"
            multiple
            onChange={handlePlatformsChange}
            required
            className={styles.select}
          >
            <option value="PS4">PS4</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
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
          <label htmlFor="genres" className={styles.label}>Genres:</label>
          <select
            id="genres"
            name="genres"
            multiple
            onChange={handleGenresChange}
            required
            className={styles.select}
          >
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Create Game</button>
      </form>
    </div>
  );
};

export default FormPage;