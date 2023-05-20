import React, { useState } from 'react';
import styles from './HomePage.module.css';
import SearchBar from '../SearchBar/SearchBar';
import GameList from '../GameList/GameList';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleGenreFilterChange = (genre) => {
    setGenreFilter(genre);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className={styles.homePage}>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.filterOptions}>
        <label htmlFor="genreFilter">Filtrar por género:</label>
        <select
          id="genreFilter"
          value={genreFilter}
          onChange={(e) => handleGenreFilterChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Action">Acción</option>
          <option value="Adventure">Aventura</option>
          <option value="Rpg">RPG</option>
          {/* Agrega más opciones de género según sea necesario */}
        </select>

        <label htmlFor="sortOrder">Ordenar por:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="">Ninguno</option>
          <option value="asc">Ascendente (A-Z)</option>
          <option value="desc">Descendente (Z-A)</option>
          {/* Agrega más opciones de orden según sea necesario */}
        </select>
      </div>

      <GameList genreFilter={genreFilter} sortOrder={sortOrder} />
    </div>
  );
};

export default HomePage;