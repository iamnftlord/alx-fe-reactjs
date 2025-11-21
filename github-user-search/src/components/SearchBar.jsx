// src/components/SearchBar.jsx
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  function submit(e) {
    e.preventDefault();
    onSearch(q.trim());
  }
  return (
    <form onSubmit={submit} className="flex gap-2" style: color="blue">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search GitHub users (e.g. octocat)"
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="p-2 border rounded ">Search</button>
      <button
        type="button"
        onClick={() => { setQ(""); onSearch(""); }}
        className="p-2 border rounded"
      >
        Clear
      </button>
    </form>
  );
}
