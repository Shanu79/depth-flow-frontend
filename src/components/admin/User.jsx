// admin/pages/Users.jsx
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.plan}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
