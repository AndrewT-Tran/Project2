import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            toast.success('Successfully logged in!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to sign in: ' + (error.message || 'Please try again'));
            toast.error('Failed to sign in');
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="card w-96 bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl justify-center mb-4" style={{ fontFamily: '"Rubik Dirt", system-ui' }}>Login</h2>
                    {error && (
                        <div className="alert alert-error" role="alert">
                            <span>{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <input
                                name="email"
                                type="email"
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-control">
                            <input
                                name="password"
                                type="password"
                                required
                                className="input input-bordered w-full"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-base-content/70">
                            Don't have an account?{' '}
                            <Link to="/register" className="link hover:link-hover text-primary">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login; 