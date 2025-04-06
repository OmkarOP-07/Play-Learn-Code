import nodemailer from 'nodemailer'; // or any other email service
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: 'ompotdar7498@gmail.com', // Your personal email
      pass: process.env.EMAIL_PASS, // Use your app password here
    },
  });

  const mailOptions = {
    from: 'ompotdar7498@gmail.com', // Your personal email
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export { generateOtp, sendOtpEmail };
