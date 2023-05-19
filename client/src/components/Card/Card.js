import React from 'react';
import styles from './Card.module.css';

const Card = ({ game }) => {
  const { background_image, name, genres } = game;

  return (
    <div className={`${styles.card} ${styles.dark}`}>
      <img src={background_image} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardGenres}>{genres?.join(', ')}</p>
      </div>
    </div>
  );
};

export default Card;