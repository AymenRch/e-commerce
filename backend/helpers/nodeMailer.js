import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

//Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;