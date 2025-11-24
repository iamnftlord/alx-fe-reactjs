// src/components/SearchBar.jsx
import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";


const Search = ()=> {
    const [username, setUsername]= useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            setLoading(true);
            setError(null);
            setUser(null);
            try {
                const res = await fetch(`https://api.github.com/users/${username.trim()}`);
                if (!res.ok) throw new Error("User not found");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError("Looks like we cant find the user");
            } finally {
                setLoading(false);
                setUsername("");
            }
        }
    };


return (
    <div className="center-page">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "0.5rem", width: "250px" }}
            />
            <button type="submit" style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}>
                Search
            </button>
            <button onClick={() => { setUsername(""); setUser(null); setError(null); }} type="reset" style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}>
                Clear
            </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && (
            <div style={{ marginTop: "1rem", border: "1px solid #eee", padding: "1rem", borderRadius: "8px", maxWidth: "350px" }}>
                <img src={user.avatar_url} alt={user.login} style={{ width: "80px", borderRadius: "50%" }} />
                <h2 style={{ margin: "0.5rem 0" }}>{user.name || user.login}</h2>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                </a>
            </div>
        )}
    </div>
  );
};

export default Search