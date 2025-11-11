import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, User } from './api/usersApi';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  }

  async function handleAddUser() {
    const newUser: User = {
      user_id: `u${Math.floor(Math.random() * 1000)}`,
      name: 'New User',
      email: `new${Math.floor(Math.random() * 100)}@example.com`,
    };
    await createUser(newUser);
    loadUsers();
  }

  async function handleDeleteUser(id: string) {
    await deleteUser(id);
    loadUsers();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Users Dashboard</h1>
      <button onClick={handleAddUser}>Add User</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(u => (
            <li key={u.user_id}>
              {u.name} ({u.email}){' '}
              <button onClick={() => handleDeleteUser(u.user_id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
