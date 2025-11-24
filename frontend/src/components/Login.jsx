import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE } from '../utils/auth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

    // Clear success message after 5 seconds
    React.useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                // Clear the location state to prevent showing the message again on refresh
                window.history.replaceState({}, document.title);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);

        try {
            console.log('Attempting login with email:', email);
            
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            console.log('Login response status:', response.status);

            let responseData;
            try {
                const responseText = await response.text();
                console.log('Raw login response:', responseText);
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (parseError) {
                console.error('Error parsing login response:', parseError);
                throw new Error('Invalid response from server');
            }

            if (!response.ok) {
                const errorMessage = responseData.message || 
                    (response.status === 401 ? 'Invalid email or password' :
                    response.status === 400 ? 'Please provide valid email and password' :
                    `Login failed with status ${response.status}`);
                
                throw new Error(errorMessage);
            }

            // Store user data in localStorage
            if (responseData.token) {
                localStorage.setItem('sb_basic', responseData.token);
                localStorage.setItem('user', JSON.stringify({
                    id: responseData.id,
                    email: responseData.email,
                    name: responseData.name,
                    role: responseData.role
                }));
                
                // Notify other components about the login
                window.dispatchEvent(new Event('storage'));
                
                console.log('Login successful, redirecting...');
                
                // Redirect to home or intended page
                const from = location.state?.from?.pathname || '/';
                navigate(from, { 
                    replace: true,
                    state: { 
                        message: 'Login successful!',
                        from: undefined // Clear the from state
                    } 
                });
            } else {
                throw new Error('Invalid response from server: Missing token');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Unable to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '90%' }}>
                <h2 className="text-center text-success mb-4">Sambalpuri Bazaar</h2>
                
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                    </div>
                )}

                <form onSubmit={onSubmit} className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            autoComplete="username"
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 mb-3">
                            {error}
                        </div>
                    )}

                    <div className="d-grid gap-2">
                        <button 
                            type="submit" 
                            className="btn btn-success btn-lg" 
                            disabled={loading || !email || !password}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Logging in...
                                </>
                            ) : 'Login'}
                        </button>
                    </div>
                    
                    <div className="text-center mt-3">
                        <Link to="/forgot-password" className="text-decoration-none">
                            Forgot password?
                        </Link>
                    </div>
                </form>

                <div className="text-center text-muted my-3">OR</div>

                <div className="d-grid gap-2">
                    <Link 
                        to="/signup" 
                        className="btn btn-outline-success"
                        state={{ from: location.state?.from }}
                    >
                        Create New Account
                    </Link>
                </div>
                
                <div className="text-center mt-3">
                    <small className="text-muted">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;