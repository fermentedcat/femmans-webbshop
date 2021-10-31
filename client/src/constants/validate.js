exports.string = (value) => value.trim() !== '';

exports.number = (value) => !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));

exports.password = (value) => value.trim().length >= 6;

exports.email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(value).toLowerCase());
};

exports.postal = (value) => value.trim().length === 5;
