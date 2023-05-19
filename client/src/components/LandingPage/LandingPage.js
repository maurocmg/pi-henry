import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './LandingPage.module.css'; // Importa los estilos CSS


const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  
    const handleButtonClick = () => {
      // Aquí puedes realizar acciones adicionales antes de redirigir a la home page
      //dispatch(/* Acción de Redux si es necesario */);
      history.push('/home'); // Redirige a la home page
    };
  
    return (
      <div className={styles.landingPage}>
        {/* Agrega el contenido de la landing page */}
        <button onClick={handleButtonClick} className={styles.button}>
          Ingresar
        </button>
      </div>
    );
  };
  
  export default LandingPage;