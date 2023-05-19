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

  const chunk = (array, size) =>
    Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );

  // Dividir los juegos en grupos de tres
  const gameRows = chunk(games, 3);

  return (
    <div>
      {gameRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.gameRow}>
          {row.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      ))}
    </div>
  );

};

export default GameList;