import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName.trim() || !lastName.trim()) {
            setError('First name and last name are required');
            toast.error('First name and last name are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, { firstName, lastName });
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setError('Failed to create an account: ' + (error.message || 'Please try again'));
            toast.error('Failed to create account');
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="card w-full max-w-lg bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl justify-center mb-4" style={{ fontFamily: '"Rubik Dirt", system-ui' }}>Register</h2>
                    {error && (
                        <div className="alert alert-error" role="alert">
                            <span>{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <input
                                    name="firstName"
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    name="lastName"
                                    type="text"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <input
                                name="email"
                                type="email"
                                required
                                className="input input-bordered w-full"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-control">
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="input input-bordered w-full"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-base-content/70">
                            Already have an account?{' '}
                            <Link to="/login" className="link hover:link-hover text-primary">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register; 