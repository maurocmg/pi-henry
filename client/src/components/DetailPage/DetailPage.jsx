import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DetailPage.module.css';


const DetailPage = ({ gameId }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const { id, name, background_image, platforms, description, released, rating, genres } = game;

  return (
    <div className={styles.detailPage}>
      <h2 className={styles.title}>{name}</h2>
      <img className={styles.image} src={image} alt={name} />
      <p>ID: {id}</p>
      <p>Plataformas: {platforms.join(', ')}</p>
      <p>Descripción: {description}</p>
      <p>Fecha de lanzamiento: {releaseDate}</p>
      <p>Rating: {rating}</p>
      <p>Géneros: {genres.join(', ')}</p>
    </div>
  );
};

export default DetailPage;