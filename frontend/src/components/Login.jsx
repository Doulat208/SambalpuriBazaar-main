import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeBasicToken, authCheck } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = makeBasicToken(email, password);
      const ok = await authCheck(token);
      if (!ok) {
        setError('Invalid email or password');
      } else {
        localStorage.setItem('sb_basic', token);
        alert('Login successful!');
        navigate('/');
      }
    } catch (err) {
      setError('Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success mb-4">Sambhalpuri Bazaar</h2>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-muted my-3">OR</div>

        <Link to="/signup" className="btn btn-outline-success w-100">
          Create an Account
        </Link>
      </div>
    </div>
  );
}
