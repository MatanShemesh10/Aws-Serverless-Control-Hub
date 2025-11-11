import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, User } from "./api/usersApi";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ user_id: "", name: "", email: "" });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetchUsers();
    document.title = "AWS Serverless Control Hub";
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", "/favicon.ico");
    document.head.appendChild(favicon);
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateUser = async () => {
    if (!newUser.user_id.trim()) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    await createUser(newUser);
    setNewUser({ user_id: "", name: "", email: "" });
    fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="app-bg d-flex flex-column min-vh-100">
      <header className="app-header text-center">
        <h1 className="fw-bold mb-1">AWS Serverless Control Hub</h1>
        <p className="text-muted mb-2">by Matan Shemesh</p>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/matanshemesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/MatanShemesh10"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
          <a
            href="https://github.com/MatanShemesh10/Aws-Serverless-Control-Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaCode size={20} />
            <span>Project Repo</span>
          </a>
        </div>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-start mt-5">
        <div className="card shadow-lg p-4 main-card">
          <h4 className="mb-4 text-center fw-semibold text-secondary">Users Management</h4>

          <div className="row g-2 mb-4">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="User ID"
                className="form-control"
                value={newUser.user_id}
                onChange={(e) => setNewUser({ ...newUser, user_id: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Name (optional)"
                className="form-control"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                placeholder="Email (optional)"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="col-md-2 position-relative">
              <button
                className="btn btn-primary w-100 position-relative"
                onClick={handleCreateUser}
              >
                Add User
              </button>
              {showTooltip && (
                <div className="tooltip-bubble">Please enter a User ID</div>
              )}
            </div>
          </div>

          <table className="table table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id}>
                  <td>{u.user_id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteUser(u.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} AWS Serverless Control Hub · Built by Matan Shemesh
      </footer>
    </div>
  );
}
