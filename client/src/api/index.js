const API_URL_USER = `http://localhost:3000/api/`;

export const getAll = async (endpoint) => {
  const response = await fetch(`${API_URL_USER}${endpoint}`)
  if (!response.ok) {
    console.log("Error getting user data");
  }
  return await response.json();
}