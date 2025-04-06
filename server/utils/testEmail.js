import dotenv from 'dotenv';
import { sendOTP } from './email.js';

dotenv.config();

const testEmail = async () => {
  try {
    console.log('Testing email configuration...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password:', process.env.EMAIL_PASSWORD ? 'Password is set' : 'Password is not set');
    
    const testOTP = '123456';
    await sendOTP('ompotdar7498@gmail.com', testOTP);
    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
};

testEmail(); 