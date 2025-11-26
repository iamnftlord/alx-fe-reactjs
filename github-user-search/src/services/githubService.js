import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  let query = "";

  if (username?.trim()) query += `${username.trim()} `;
  if (location?.trim()) query += `location:${location.trim()} `;
  if (minRepos?.trim()) query += `repos:>=${minRepos.trim()} `;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: query.trim(),
      per_page: 30,
      page,
    },
  });

  return {
    items: response.data.items,
    total_count: response.data.total_count,
  };
};
