// Test script to verify connection to the Atlas server
import axios from 'axios';

const API_URL = 'https://play-learn-code-server.onrender.com/api';

async function testConnection() {
  try {
    console.log('Testing connection to:', API_URL);
    
    // Test the CORS endpoint
    const testResponse = await axios.get(`${API_URL}/test-cors`);
    console.log('CORS test response:', testResponse.data);
    
    // Test the login endpoint (without credentials)
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password'
      });
      console.log('Login test response:', loginResponse.data);
    } catch (loginError) {
      console.log('Login test expected error:', loginError.response?.status, loginError.response?.data);
    }
    
    console.log('Connection test completed successfully!');
  } catch (error) {
    console.error('Connection test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testConnection(); 