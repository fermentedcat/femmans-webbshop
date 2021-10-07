exports.validationErrors = (err) => {
  let errors = {};
    Object.entries(err.errors).map((error) => {
      return errors[error[0]] = error[1].properties.message;
    })
  return errors;
}