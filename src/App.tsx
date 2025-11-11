import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, getLogs, User } from "./api/usersApi";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ user_id: "", name: "", email: "" });
  const [showTooltip, setShowTooltip] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [logs, setLogs] = useState<{ timestamp: string; message: string }[]>([]);

  useEffect(() => {
    fetchUsers();
    loadLogs();
    document.title = "AWS Serverless Control Hub";
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", "/favicon.ico");
    document.head.appendChild(favicon);
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setErrorMsg("Failed to load users. Please try again later.");
    }
  };

  const handleCreateUser = async () => {
    setErrorMsg("");

    if (!newUser.user_id.trim()) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    try {
      await createUser(newUser);
      setNewUser({ user_id: "", name: "", email: "" });
      fetchUsers();
      loadLogs();
    } catch (err: any) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setErrorMsg("");
    try {
      await deleteUser(id);
      fetchUsers();
      loadLogs();
    } catch (err: any) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const loadLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data.slice(-5)); // ✅ מציג רק 5 האחרונים
    } catch (err: any) {
      console.error("Failed to load logs:", err);
    }
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
          {/* Users Section */}
            <h4 className="mb-4 text-center fw-semibold text-secondary">Users Management</h4>
            {errorMsg && (
              <div className="alert alert-danger text-center py-2 mb-3" role="alert">
                {errorMsg}
              </div>
            )}

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
                {showTooltip && <div className="tooltip-bubble">Please enter a User ID</div>}
              </div>
            </div>

          <div className="users-section">
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

          {/* Logs Section */}
          <div className="logs-section">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="text-secondary mb-0">Lambda Logs</h5>
              <button className="btn btn-outline-secondary btn-sm" onClick={loadLogs}>
                Refresh Logs
              </button>
            </div>
            <pre
              className="bg-light p-3 rounded"
              style={{
                maxHeight: "70%",
                overflowY: "auto",
                fontSize: "0.9rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {logs.length === 0
                ? "No logs found."
                : logs.map((l) => `[${l.timestamp}] ${l.message}`).join("\n")}
            </pre>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} AWS Serverless Control Hub · Built by Matan Shemesh
      </footer>
    </div>
  );
}
