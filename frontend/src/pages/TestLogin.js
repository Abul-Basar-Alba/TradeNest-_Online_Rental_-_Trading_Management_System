import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
  const [email, setEmail] = useState('basar@gmail.com');
  const [password, setPassword] = useState('otpm33551');
  const [result, setResult] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTest = async () => {
    try {
      setResult('Calling API...');
      const response = await authAPI.login({ email, password });
      
      setResult('Response: ' + JSON.stringify(response.data, null, 2));
      
      // Check if token and user exist
      if (response.data.token && response.data.user) {
        setResult(prev => prev + '\n\nToken exists! Calling login...');
        login({ token: response.data.token, user: response.data.user });
        setResult(prev => prev + '\n\nLogin called! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setResult(prev => prev + '\n\nERROR: No token or user in response!');
      }
    } catch (error) {
      setResult('ERROR: ' + error.message + '\n\n' + JSON.stringify(error.response?.data, null, 2));
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test Login</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Email:</label><br />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Password:</label><br />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px' }}
        />
      </div>

      <button 
        onClick={handleTest}
        style={{ 
          padding: '15px 30px', 
          background: '#4CAF50', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test Login
      </button>

      {result && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#f5f5f5',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace'
        }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default TestLogin;
