import React, { useState } from 'react';
import { ThemeToggle } from '../utils/theme/ThemeToggle';
import weatherLogo from '/weather-app.png';

function Navbar({ currentUser, loading, onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="navbar sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center w-full">
                    <img src={weatherLogo} alt="Weather App Logo" className="w-10 h-10 object-contain" />
                    <a className="btn btn-ghost text-xl text-primary font-normal" style={{ fontFamily: '"Rubik Dirt", system-ui' }}>Weather Tracker</a>

                    <div className="hidden lg:flex items-center gap-4">
                        <span className="text-base-content/70">{currentUser?.email}</span>
                        <button
                            onClick={onLogout}
                            disabled={loading}
                            className="btn-xs px-2 py-1 text-xs bg-error glass text-base-content hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging out...' : 'Logout'}
                        </button>
                        <ThemeToggle />
                    </div>

                    <div className="lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <li>
                                <span className="text-base-content/70">{currentUser?.email}</span>
                            </li>
                            <li>
                                <button
                                    onClick={onLogout}
                                    disabled={loading}
                                    className="text-base-content hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Logging out...' : 'Logout'}
                                </button>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ThemeToggle />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar; 