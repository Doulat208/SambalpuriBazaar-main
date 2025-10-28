import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE } from '../utils/auth';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, address })
      });
      if (res.created) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else if (res.status === 409) {
        setError('Email already registered');
      } else {
        const msg = await res.text();
        setError(msg || 'Signup failed');
      }
    } catch (err) {
      setError('Unable to signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success mb-4">Sambalpuri Bazaar</h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label htmlFor="terms" className="form-check-label small">
              I agree to the <a href="#" className="text-success text-decoration-none">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-muted my-3">OR</div>

        <Link to="/login" className="btn btn-outline-success w-100">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
