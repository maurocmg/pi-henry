import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import SearchBar from '../SearchBar/SearchBar';
import GameList from '../GameList/GameList';
import { Link } from 'react-router-dom';
import { getGenres, getPlatforms } from '../FormPage/utils'; // Import the utility functions

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [originFilter, setOriginFilter] = useState('');

  useEffect(() => {
    // Fetch the list of genres and platforms when the component mounts
    const fetchGenresAndPlatforms = async () => {
      const fetchedGenres = await getGenres();
      const fetchedPlatforms = await getPlatforms();
      setGenres(fetchedGenres);
      setPlatforms(fetchedPlatforms);
    };

    fetchGenresAndPlatforms();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleGenreFilterChange = (genre) => {
    setGenreFilter(genre);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleOriginFilterChange = (origin) => {
    setOriginFilter(origin);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <SearchBar onSearch={handleSearch} />
        <Link to="/form" className={styles.addButton}>
          Agregar juego
        </Link>
      </div>
      <div className={styles.filterOptions}>
        <label htmlFor="genreFilter">Filtrar por género:</label>
        <select
          id="genreFilter"
          value={genreFilter}
          onChange={(e) => handleGenreFilterChange(e.target.value)}
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option value={genre.name} key={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>

        <label htmlFor="originFilter">Filtrar por origen:</label>
        <select
          id="originFilter"
          value={originFilter}
          onChange={(e) => handleOriginFilterChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="API">API</option>
          <option value="base_de_datos">Base de datos</option>
        </select>

        <label htmlFor="sortOrder">Ordenar por:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="">Ninguno</option>
          <option value="name_asc">Ascendente (A-Z)</option>
          <option value="name_desc">Descendente (Z-A)</option>
          <option value="rating_asc">Rating Ascendente</option>
          <option value="rating_desc">Rating Descendente</option>
        </select>
      </div>

      <GameList genreFilter={genreFilter} sortOrder={sortOrder} searchTerm={searchTerm} originFilter={originFilter} />
    </div>
  );
};

export default HomePage;