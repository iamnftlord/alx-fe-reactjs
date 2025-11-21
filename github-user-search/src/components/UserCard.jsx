// src/components/UserCard.jsx
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="border rounded p-4 flex items-center gap-4">
      <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="font-bold">
          <Link to={`/user/${user.login}`}>{user.login}</Link>
        </h3>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="text-sm">
          View on GitHub
        </a>
      </div>
    </div>
  );
}
