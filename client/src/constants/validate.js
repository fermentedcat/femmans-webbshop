exports.string = (value) => {
  return value.trim() !== ''
};

exports.password = (value) => {
  return value.trim().length >= 6
};

exports.email = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(value).toLowerCase())
};

exports.postal = (value) => {
  return value.trim().length === 5
};