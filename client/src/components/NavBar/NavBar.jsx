import React from 'react';
import styles from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearch }) => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarContent}>
        <SearchBar onSearch={onSearch} />
        <Link to="/form" className={styles.addButton} >
          Agregar juego
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;