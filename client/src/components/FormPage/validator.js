export const validator = (data) => {
  const errors = {};

  // Validación del nombre
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  if (data.name.trim().length > 50) {
    errors.name = 'Name cannot exceed 50 characters';
  }

  // Validación de la imagen
  if (!data.background_image.trim()) {
    errors.background_image = 'Image URL is required';
  }
  const urlPattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (!urlPattern.test(data.background_image.trim())) {
  errors.background_image = 'Invalid URL format';
  }

  // Validación de la descripción
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }
  if (data.description.trim().length > 250) {
    errors.description = 'Description cannot exceed 250 characters';
  }

  // Validación de las plataformas
  if (data.platforms.length === 0) {
    errors.platforms = 'Select at least one platform';
  }

  // Validación de la fecha de lanzamiento
  if (!data.released.trim()) {
    errors.released = 'Release Date is required';
  }
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(data.released.trim())) {
    errors.released = 'Invalid date format (dd/mm/yyyy)';
  } else {
    const currentDate = new Date();
    const enteredDate = new Date(data.released);
    if (enteredDate > currentDate) {
      errors.released = 'Release date cannot be in the future';
    }
  }

  // Validación de la calificación
  if (!data.rating.trim()) {
    errors.rating = 'Rating is required';
  } else if (isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    errors.rating = 'Rating must be a number between 1 and 10';
  }
  // const ratingPattern = /^\d+(\.\d{1,2})?$/;
  // if (!ratingPattern.test(data.rating.trim())) {
  //   errors.rating = 'Rating must be a floating-point number with a maximum of two decimals';
  // }

  // Validación de los géneros
  if (data.genres.length === 0) {
    errors.genres = 'Select at least one genre';
  }

  return errors;
};