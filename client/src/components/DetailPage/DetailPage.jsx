import React, { useEffect, useState, } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from './DetailPage.module.css';


const DetailPage = () => {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

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
      <img className={styles.image} src={background_image} alt={name} />
      <p>ID: {id}</p>
      <p>Plataformas: {platforms.join(', ')}</p>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
      <p>Fecha de lanzamiento: {released}</p>
      <p>Rating: {rating}</p>
      <p>Géneros: {genres.join(', ')}</p>
    </div>
  );
};

export default DetailPage;