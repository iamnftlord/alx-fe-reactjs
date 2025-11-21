// src/pages/Home.jsx
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { searchUsers } from "../services/githubApi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(q) {
    setQuery(q);
    if (!q) {
      setUsers([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(q);
      setUsers(data.items || []);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {loading ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}
