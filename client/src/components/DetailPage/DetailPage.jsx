import React, { useEffect, useState, } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from './DetailPage.module.css';
import { Link } from 'react-router-dom';


const DetailPage = () => {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error cargando videogame:', error);
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
      <Link to="/home" className={styles.backButton}>Volver a la página de inicio</Link>
      <h2 className={styles.title}>{name}</h2>
      <img className={styles.image} src={background_image} alt={name} />
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
      <p>
        <span className={styles.detail}>ID:</span> {id} 
      </p>
      <p>
        <span className={styles.detail}>Plataformas:</span> {platforms.join(', ')}
      </p>
      <p>
        <span className={styles.detail}>Fecha de lanzamiento:</span> {released}
      </p>
      <p>
        <span className={styles.detail}>Rating:</span> {rating}
      </p>
      <p>
        <span className={styles.detail}>Géneros:</span> {genres.join(', ')}
      </p>
    </div>
  );
};

export default DetailPage;