import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/auth/register', { name, email, password });
      setMessage('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page vh-100">
      <div className="row g-0 h-100">
        {/* Left Side - Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="px-4 py-5 px-md-5 w-100" style={{ maxWidth: '500px' }}>
            <div className="text-center mb-5">
              <h2 className="fw-bold text-primary">Create Account</h2>
              <p className="text-muted">Fill in your details to get started</p>
            </div>

            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                {message}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage('')}
                ></button>
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Create a password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                    <i className="bi bi-person-plus me-2"></i>
                  )}
                  Register
                </button>
              </div>

              <div className="text-center">
                <p className="text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none fw-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 d-none d-md-block register-image">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="text-white p-5 text-center">
              <h1 className="display-4 fw-bold mb-4">Join Us Today</h1>
              <p className="lead">Become part of our growing community</p>
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
        .register-page {
          background-color: #f8f9fa;
        }
        .register-image {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
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