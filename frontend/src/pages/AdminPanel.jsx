import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Toolbar from '../components/Toolbar';

export default function AdminPanel() {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUsers(res.data);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      if (err.response?.status === 403) logout();
      else setError("Failed to load users");
    });
  }, [token, logout]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(users.map(u => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'danger';
      case 'pending': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="admin-panel bg-light min-vh-100">
      <div className="container-fluid py-4">
        <div className="card shadow-sm">
          <div className="card-header bg-white border-bottom-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h4 mb-0 text-primary">
                <i className="bi bi-people-fill me-2"></i>
                User Management
              </h2>
              <div>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-outline-secondary me-2"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                </button>
                <button 
                  onClick={logout}
                  className="btn btn-primary"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show mx-4 mt-3" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          <div className="card-body pt-0">
            <Toolbar selectedIds={selectedIds} refresh={() => window.location.reload()} />

            <div className="table-responsive">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading users...</p>
                </div>
              ) : (
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th width="50">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={selectedIds.length === users.length && users.length > 0}
                            onChange={toggleSelectAll} 
                          />
                        </div>
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Last Login</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={selectedIds.includes(user.id) ? 'table-active' : ''}>
                        <td>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={selectedIds.includes(user.id)}
                              onChange={() => toggleSelect(user.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar me-3">
                              <span className="avatar-text bg-primary text-white rounded-circle">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="fw-semibold">{user.name}</div>
                              <small className="text-muted">{user.role}</small>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                        </td>
                        <td>
                          <span className={`badge bg-${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {users.length === 0 && !isLoading && (
                <div className="text-center py-5 text-muted">
                  <i className="bi bi-people display-6 opacity-50"></i>
                  <p className="mt-3">No users found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
      />

      {/* Custom styles */}
      <style>{`
        .admin-panel {
          background-color: #f8f9fa;
        }
        .avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-text {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.05);
        }
        .card {
          border-radius: 0.5rem;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}