// src/pages/UserDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getUserRepos } from "../services/githubService";

export default function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getUser(username);
        setUser(data);
        const r = await getUserRepos(username);
        setRepos(r);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <div className="flex gap-4 items-center">
        <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer">Open on GitHub</a>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="font-semibold">Repositories</h2>
        <ul>
          {repos.map(r => (
            <li key={r.id}><a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a></li>
          ))}
        </ul>
      </section>
    </div>
  );
}