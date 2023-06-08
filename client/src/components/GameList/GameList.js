import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './GameList.module.css';

const GameList = ({ genreFilter, sortOrder, searchTerm, originFilter }) => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
          let filteredGames = []

          if (!searchTerm) {
            const response = await axios.get('http://localhost:3001/videogames');
            filteredGames = response.data.videogames;
          } else {
            try {
              const response = await axios.get(
                `http://localhost:3001/videogames/name?name=${searchTerm}`
              );
              filteredGames = response.data;
            } catch (error) {
              if (error.response && error.response.status === 404) {
                window.alert('No se encontraron juegos con ese nombre.');
              } else {
                throw error;
              }
            }
          }

          // Filtrar por género
          if (genreFilter) {
            filteredGames = filteredGames.filter((game) => game.genres.includes(genreFilter));
          }

          // Filtrar por término de búsqueda
          if (searchTerm) {
            filteredGames = filteredGames.filter((game) =>
              game.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          // Ordenar por clasificación
          if (sortOrder === 'rating_asc') {
            filteredGames = filteredGames.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
          } else if (sortOrder === 'rating_desc') {
            filteredGames = filteredGames.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          } else if (sortOrder === 'name_asc') {
            filteredGames = filteredGames.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          } else if (sortOrder === 'name_desc') {
            filteredGames = filteredGames.sort((a, b) =>
              b.name.localeCompare(a.name)
            );
          }

          if (originFilter === 'base_de_datos') {
            filteredGames = filteredGames.filter((game) => game.id.toString().match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/));
          } else if (originFilter === 'API') {
            filteredGames = filteredGames.filter((game) => !game.id.toString().match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/));
          }

          setGames(filteredGames);
          setCurrentPage(1)
      } catch (error) {
        console.error('Error de servidor:', error);
      }
    };

    fetchGames();
  }, [genreFilter, sortOrder, searchTerm, originFilter]);


  const gamesPerPage = 15;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(games.length / gamesPerPage);

  const chunk = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );

  // Dividir los juegos en grupos de tres
  const gameRows = chunk(currentGames, 3);

  return (
    <div>
        <div>
            {gameRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.gameRow}>
                    {row.map((game) => (
                    <Card key={game.id} game={game} />
                    ))}
                </div>
            ))}
        </div>
        <div className={styles.pageIndicator}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
        <button
        key={index}
        className={currentPage === index + 1 ? styles.active : ''}
        onClick={() => handlePageChange(index + 1)}
        >
        {index + 1}
        </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente 
        </button>
        </div>
    </div>
  );

};

export default GameList;