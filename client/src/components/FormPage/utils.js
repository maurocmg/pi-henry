import axios from 'axios';

export const getGenres = async () => {
  try {
    const response = await axios.get('http://localhost:3001/genres/'); // Cambia la ruta según corresponda
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPlatforms = async () => {
  try {
    const response = await axios.get('http://localhost:3001/platforms/'); // Cambia la ruta según corresponda
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};