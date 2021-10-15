export const getToken = () => {
  const token = window.localStorage.getItem('TOKEN');
  return token;
}

export const setToken = (token) => {
  window.localStorage.setItem('TOKEN', token);
}