import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) {
        // Hide success UI; only use error state when failing
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
        setError(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      setConnectionStatus('error');
      setError(err.message);
      console.error('Backend connection failed:', err);
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return <Loader className="h-5 w-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Checking connection...';
      case 'connected':
        return 'Backend connected successfully!';
      case 'error':
        return `Connection failed: ${error}`;
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'connected':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (connectionStatus !== 'error') return null;

  return (
    <div className={`p-4 rounded-lg border-2 ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <p className="font-medium">{getStatusText()}</p>
          <p className="text-sm mt-1">
            Make sure the backend server is running on port 3000
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;
