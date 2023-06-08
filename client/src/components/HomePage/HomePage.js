import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import GameList from '../GameList/GameList';
//import { Link } from 'react-router-dom';
import { getGenres, /*getPlatforms*/ } from '../FormPage/utils'; 
import NavBar from '../NavBar/NavBar'; 


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [genres, setGenres] = useState([]);
//  const [platforms, setPlatforms] = useState([]);
  const [originFilter, setOriginFilter] = useState('');

  useEffect(() => {
    const fetchGenresAndPlatforms = async () => {
    const fetchedGenres = await getGenres();
//      const fetchedPlatforms = await getPlatforms();
    setGenres(fetchedGenres);
//      setPlatforms(fetchedPlatforms);
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
      <NavBar onSearch={handleSearch} /> 
      
      <div className={styles.filterOptions}>
        <div className={styles.filterOption}>
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
        </div>

        <div className={styles.filterOption}>
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
        </div>

        <div className={styles.filterOption}>
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
      </div>

      <GameList genreFilter={genreFilter} sortOrder={sortOrder} searchTerm={searchTerm} originFilter={originFilter} />
    </div>
  );
};

export default HomePage;