import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState('password'); // 'password' or 'otp'
  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authMethod === 'password') {
        await login(formData.email, formData.password);
        setMessage('Successfully signed in!'); // Set success message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        navigate('/');
      } else {
        navigate('/otp-login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');
      setMessage('Failed to sign in.'); // Set error message
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 to-violet-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-purple-100">
          Or{' '}
          <Link to="/signup" className="font-medium text-purple-200 hover:text-white">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-lg py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-white/10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              {message}
            </div>
          )}
          <div className="mb-6 flex rounded-md shadow-sm">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md ${
                authMethod === 'password'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-purple-200 hover:text-white'
              }`}
              onClick={() => setAuthMethod('password')}
            >
              Password
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md ${
                authMethod === 'otp'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-purple-200 hover:text-white'
              }`}
              onClick={() => setAuthMethod('otp')}
            >
              OTP
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input bg-white/5 border-white/10 text-white placeholder-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {authMethod === 'password' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input bg-white/5 border-white/10 text-white placeholder-gray-400"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-white/20 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-purple-200 hover:text-white">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Signing in...' : authMethod === 'password' ? 'Sign in' : 'Continue with OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 