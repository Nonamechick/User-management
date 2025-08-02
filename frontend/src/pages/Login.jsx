import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });

      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page vh-100">
      <div className="row g-0 h-100">
        {/* Left Side - Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="px-4 py-5 px-md-5 w-100" style={{ maxWidth: '500px' }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold text-primary">Welcome Back</h2>
              <p className="text-muted">Please enter your credentials to login</p>
            </div>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError('')}
                ></button>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="d-grid mb-3">
                <button 
                  className="btn btn-primary btn-lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : (
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                  )}
                  Login
                </button>
              </div>

              <div className="text-center">
                <p className="text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none fw-semibold">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 d-none d-md-block login-image">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="text-white p-5 text-center">
              <h1 className="display-4 fw-bold mb-4">Your Awesome App</h1>
              <p className="lead">Manage your users with our powerful admin dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
      />

      {/* Custom Styles */}
      <style>{`
        .login-page {
          background-color: #f8f9fa;
        }
        .login-image {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
          background-size: cover;
          background-position: center;
        }
        .form-control-lg {
          padding: 0.75rem 1rem;
          font-size: 1.05rem;
        }
        .btn-lg {
          padding: 0.75rem 1.5rem;
          font-size: 1.05rem;
        }
      `}</style>
    </div>
  );
}