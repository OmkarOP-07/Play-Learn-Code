const express = require('express');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const router = express.Router();

// Generate OTP and send email
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = speakeasy.totp({
    secret: process.env.SECRET,
    encoding: 'base32',
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpires: Date.now() + 300000 }, // OTP valid for 5 minutes
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'OTP sent', user });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  res.status(200).json({ message: 'OTP verified successfully' });
});

module.exports = router;