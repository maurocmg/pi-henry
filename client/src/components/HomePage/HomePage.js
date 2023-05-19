import React from 'react';
import styles from './HomePage.module.css';
import SearchBar from '../SearchBar/SearchBar';
//import Card from '../Card/Card';
import GameList from '../GameList/GameList';


const HomePage = () => {
  // Lógica y estado relacionados con la búsqueda y los videojuegos

  const handleSearch = (searchTerm) => {
    // Realizar la lógica de búsqueda y actualización del estado de los videojuegos
  };

  const handleCardClick = (gameId) => {
    // Redireccionar al detalle del videojuego correspondiente al hacer click en una card
  };

  return (
    <div className={styles.homePage}>
      <SearchBar onSearch={handleSearch} />

      {/* Agrega el componente GameList */}
      <GameList />
    
 
    </div>
  );
};

export default HomePage;