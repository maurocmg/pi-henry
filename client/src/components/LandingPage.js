import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  
    const handleButtonClick = () => {
      // Aquí puedes realizar acciones adicionales antes de redirigir a la home page
      dispatch(/* Acción de Redux si es necesario */);
      history.push('/home'); // Redirige a la home page
    };
  
    return (
      <div className="landing-page">
        {/* Agrega el contenido de la landing page, como la imagen de fondo */}
        <button onClick={handleButtonClick}>Ingresar</button>
      </div>
    );
  };
  
  export default LandingPage;