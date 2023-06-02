export const validator = (data) => {
  const errors = {};

  // Validación del nombre
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  // Validación de la imagen
  if (!data.background_image.trim()) {
    errors.background_image = 'Image URL is required';
  }

  // Validación de la descripción
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  // Validación de las plataformas
  if (data.platforms.length === 0) {
    errors.platforms = 'Select at least one platform';
  }

  // Validación de la fecha de lanzamiento
  if (!data.released.trim()) {
    errors.released = 'Release Date is required';
  }

  // Validación de la calificación
  if (!data.rating.trim()) {
    errors.rating = 'Rating is required';
  } else if (isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    errors.rating = 'Rating must be a number between 1 and 10';
  }

  // Validación de los géneros
  if (data.genres.length === 0) {
    errors.genres = 'Select at least one genre';
  }

  return errors;
};