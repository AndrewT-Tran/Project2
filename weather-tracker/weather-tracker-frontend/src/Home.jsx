import React, { useState, useEffect } from "react";
import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import WeatherCard from './components/WeatherCard';
import Navbar from './components/Navbar';

const cityOptions = [
    "New York", "London", "Tokyo", "Paris", "Berlin",
    "Dubai", "Sydney", "Mumbai", "Toronto", "San Francisco"
];

function Home() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedCities, setSelectedCities] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Get user's first name from email
    const firstName = currentUser?.email?.split('@')[0]?.split('.')[0] || 'User';

    useEffect(() => {
        // Check if user is authenticated
        if (!currentUser) {
            navigate('/login');
            return;
        }

        // Clear any existing errors
        setError("");
    }, [currentUser, navigate]);

    const toggleCitySelection = (city) => {
        setSelectedCities((prev) =>
            prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
        );
    };

    const clearAllSelections = () => {
        setSelectedCities([]);
        setWeatherData([]);
        setError("");
        toast.info("All selections cleared");
    };

    const fetchWeather = async () => {
        if (selectedCities.length < 3) {
            toast.error("Please select at least 3 cities.");
            setError("Please select at least 3 cities.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const token = await currentUser.getIdToken();
            const response = await axios.get(`http://localhost:8000/weather?cities=${selectedCities.join(",")}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWeatherData(response.data);
            toast.success("Weather data fetched successfully!");
        } catch (err) {
            console.error("Error fetching weather data:", err);
            const errorMessage = err.response?.data?.message || err.message || "Error fetching weather data";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout. Please try again.");
        }
    };

    if (!currentUser) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar
                currentUser={currentUser}
                loading={loading}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className=" mx-auto px-4 py-8">
                {/* Welcome Message */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                        Welcome back, {firstName}!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Track weather conditions across multiple cities
                    </p>
                </div>

                {/* City Selection */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-medium text-blue-600 mb-4">
                        Select at least 3 cities: {selectedCities.length > 0 && `(${selectedCities.length} selected)`}
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {cityOptions.map((city) => (
                            <fieldset key={city} className="p-3 bg-white shadow-sm border border-gray-200 rounded-lg">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-gray-700">{city}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedCities.includes(city)}
                                        onChange={() => toggleCitySelection(city)}
                                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-full"
                                    />
                                </label>
                            </fieldset>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                            onClick={fetchWeather}
                            disabled={loading || selectedCities.length < 3}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Get Weather"
                            )}
                        </button>
                        <button
                            onClick={clearAllSelections}
                            disabled={loading || selectedCities.length === 0}
                            className="btn btn-outline flex-1 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Clear All ({selectedCities.length})
                        </button>
                    </div>

                    {error && (
                        <div className="alert alert-error mb-6">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Weather Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {weatherData.map((weather, index) => (
                            <div
                                key={index}
                                className="animate-fade-in h-full"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <WeatherCard weather={weather} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;