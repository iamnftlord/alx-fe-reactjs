// src/services/githubApi.js
import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

const token = import.meta.env.VITE_GITHUB_API_TOKEN || "";

const api = axios.create({
  baseURL: GITHUB_BASE,
  headers: token
    ? { Authorization: `token ${token}` } // use token for higher rate limits
    : undefined,
  params: {
    per_page: 30
  }
});

export async function searchUsers(query) {
  if (!query) return { items: [] };
  const res = await api.get("/search/users", {
    params: { q: query }
  });
  return res.data; // { total_count, items: [...] }
}

export async function getUser(username) {
  const res = await api.get(`/users/${username}`);
  return res.data;
}

export async function getUserRepos(username, page = 1, per_page = 30) {
  const res = await api.get(`/users/${username}/repos`, {
    params: { page, per_page, sort: "updated" }
  });
  return res.data;
}
