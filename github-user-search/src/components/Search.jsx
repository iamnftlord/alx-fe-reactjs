// src/components/SearchBar.jsx
import React, { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const runSearch = async (pageNumber = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: pageNumber,
      });

      // Append or replace results
      setResults((prev) => (append ? [...prev, ...data.items] : data.items));

      // GitHub returns total count → check if more results exist
      setHasMore(data.total_count > pageNumber * 30);
    } catch (err) {
      setError("Unable to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    runSearch(1, false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    runSearch(nextPage, true);
  };

  return (
    <div  className="w-full flex flex-col items-center mt-10 px-4">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        class="bg-gray-500 p-10 rounded-lg shadow-md flex flex-col gap-3"
      >

        <input
          type="text"
          placeholder="GitHub username"
          class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Location (e.g., Lagos)"
          class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Minimum Repositories"
          class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition "
        >
          Search
        </button>
        <button onClick={() => { setUsername(""); setUser(null); setError(null); setLocation(""); setMinRepos("")}} 
                type="reset" 
                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Clear
        </button>
      </form>

      {/* LOADING */}
      {loading && <p className="mt-4 text-blue-600 font-medium">Loading...</p>}

      {/* ERROR */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* RESULTS */}
      <div className="mt-6 w-full max-w-xl space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              className="w-16 h-16 rounded-full"
              alt={user.login}
            />

            <div>
              <h3 className="text-lg font-semibold">{user.login}</h3>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {hasMore && !loading && (
        <button
          onClick={loadMore}
          className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
