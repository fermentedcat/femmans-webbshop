const API_URL_USER = `http://localhost:3000/api/users/`;

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL_USER}${userId}`)
  if (!response.ok) {
    console.log("Error getting user data");
  }
  return await response.json();
}

export const addNewUser = async (userData) => {
  const response = await fetch(API_URL_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    console.log("Error adding user");
  }
  return await response.json();
}