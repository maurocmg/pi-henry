import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LandingPage.module.css'; // Importa los estilos CSS


const LandingPage = () => {
    const history = useHistory();
  
    const handleButtonClick = () => {
      history.push('/home'); 
    };
  
    return (
      <div className={styles.landingPage}>
        <button onClick={handleButtonClick} className={styles.button}>
          Ingresar
        </button>
      </div>
    );
  };
  
  export default LandingPage;