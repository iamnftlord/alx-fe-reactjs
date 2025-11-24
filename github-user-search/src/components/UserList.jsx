// src/components/UserList.jsx
import UserCard from "./UserCard";

function UserList({ users }) {
  if (!users || users.length === 0) {
    return <div className="mt-4">No results</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}

export default UserList;