import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchBarContainer} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Buscar videojuegos por nombre..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className={styles.searchButton} type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;