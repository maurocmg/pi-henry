import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './GameList.module.css'; // Importa los estilos CSS


const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/videogames');
        setGames(response.data.videogames);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
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
                {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index}
                className={currentPage === index + 1 ? styles.active : ''}
                onClick={() => handlePageChange(index + 1)}
                >
                {index + 1}
                </button>
                ))}
        </div>
    </div>
  );

};

export default GameList;