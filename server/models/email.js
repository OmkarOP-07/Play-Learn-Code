import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send OTP email
export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Login',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">OTP for Login</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="font-size: 16px; color: #666;">Your OTP is:</p>
          <h2 style="color: #007bff; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
        </div>
        <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Verify OTP (helper function)
export const verifyOTP = (storedOTP, storedOTPExpiry, providedOTP) => {
  if (!storedOTP || !storedOTPExpiry) {
    return false;
  }

  if (Date.now() > storedOTPExpiry) {
    return false;
  }

  return storedOTP === providedOTP;
}; 