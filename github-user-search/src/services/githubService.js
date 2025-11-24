// src/services/githubApi.js
import axios from "axios";

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com${username}`);
  return response.data;
};

