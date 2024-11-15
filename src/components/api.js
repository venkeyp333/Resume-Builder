import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // The URL of your Flask server

// Function to handle registration
export const registerUser = async (username, email, password,roles) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      roles
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response || error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to handle login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    throw error.response ? error.response.data : error.message;
  }
};
