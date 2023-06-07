const validator = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  }

  if (!data.description) {
    errors.description = 'Description is required';
  }

  if (!data.background_image) {
    errors.background_image = 'Image URL is required';
  }

  if (!data.released) {
    errors.released = 'Release date is required';
  }

  if (!data.rating) {
    errors.rating = 'Rating is required';
  } else if (data.rating < 1 || data.rating > 10) {
    errors.rating = 'Rating must be between 1 and 10';
  }

  if (data.genres.length === 0) {
    errors.genres = 'At least one genre must be selected';
  }

  if (data.platforms.length === 0) {
    errors.platforms = 'At least one platform must be selected';
  }

  return errors;
};

module.exports = validator;