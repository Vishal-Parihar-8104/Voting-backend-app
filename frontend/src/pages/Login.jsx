import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Vote, User, Lock, Mail, Phone, MapPin, CreditCard, Eye, EyeOff, Github, Instagram, Linkedin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ConnectionTest from '../components/ConnectionTest';

const Login = () => {
  const { login, signup, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    aadharCardNumber: '',
    password: '',
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    role: 'voter',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      await login(formData.aadharCardNumber, formData.password);
    } else {
      await signup(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      aadharCardNumber: '',
      password: '',
      name: '',
      age: '',
      email: '',
      mobile: '',
      address: '',
      role: 'voter',
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center gradient-accent py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blobs */}
      <div className="decor-blob w-72 h-72 bg-primary-300/40 -top-10 -left-10" />
      <div className="decor-blob w-96 h-96 bg-success-300/40 bottom-0 right-0" />

      <div className="relative max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Vote className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join our secure voting platform'
            }
          </p>
        </div>

        <div className="glass-card p-8">
          {/* Connection Test */}
          <ConnectionTest />
          
          {/* Tab Navigation */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-center font-medium border-b-2 transition-colors duration-200 ${
                isLogin
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-center font-medium border-b-2 transition-colors duration-200 ${
                !isLogin
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Aadhar Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline h-4 w-4 mr-2" />
                Aadhar Card Number
              </label>
              <input
                type="number"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter 12-digit Aadhar number"
                maxLength="12"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter age"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                    placeholder="Enter address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="voter">Voter</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-button flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner size="small" text="" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Footer Social Links */}
          <div className="social-links">
            <a href="https://github.com/Vishal-Parihar-8104" target="_blank" rel="noreferrer" className="social-btn">
              <Github className="social-icon text-gray-800" /> 
            </a>
            <a href="https://www.instagram.com/vishu_8104/" target="_blank" rel="noreferrer" className="social-btn">
              <Instagram className="social-icon text-pink-600" /> 
            </a>
            <a href="https://www.linkedin.com/in/vishal-kumar-b55266309/" target="_blank" rel="noreferrer" className="social-btn">
              <Linkedin className="social-icon text-blue-600" /> 
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Developed by <a href="https://www.linkedin.com/in/vishal-kumar-b55266309/" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">Vishal Parihar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
