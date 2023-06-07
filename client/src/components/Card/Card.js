import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';


const Card = ({ game }) => {
  const { id, background_image, name, genres } = game;
  // const history = useHistory();

  // const handleClick = () => {
  //   history.push(`/detail/${id}`);
  // };

  return (
    <Link to={`/detail/${id}`} className={`${styles.card} ${styles.dark}`}>
      <img src={background_image} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardGenres}>{genres?.join(', ')}</p>
      </div>
    </Link>
  );
};

export default Card;