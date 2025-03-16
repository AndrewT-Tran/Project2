import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './index.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoute from './auth/PrivateRoute'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import { ToastContainer } from 'react-toastify'
import { ThemeContextProvider } from './utils/theme/ThemeContext'
import { ThemeToggle } from './utils/theme/ThemeToggle'

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <div className="container mx-auto px-4">
              <ThemeToggle />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="system"
                className="glass-effect"
                toastClassName="glass-effect"
              />
            </div>
          </div>
        </AuthProvider>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;