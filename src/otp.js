import axios from 'axios';

const sendOtp = async (email) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
    console.log(response.data.message);
  } catch (error) {
    console.error(error.response.data.message);
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
    console.log(response.data.message);
  } catch (error) {
    console.error(error.response.data.message);
  }
};