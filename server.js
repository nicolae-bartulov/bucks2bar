// server.js

import express from 'express';
import { createTransport } from 'nodemailer';
import pkg from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import bodyParser from 'body-parser';

dotenv.config();

const { json } = pkg;

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    handler: (req, res) => {
        res.status(429).json({ success: false, error: 'Too many requests from this IP, please try again after 15 minutes' });
    }
});

app.post('/send-email', emailLimiter, (req, res) => {
    const { image, email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
    if (!image.startsWith('data:image/png;base64,')) {
        return res.status(400).json({ success: false, error: 'Invalid image data' });
    }

    // Create a transporter object using SMTP transport
    const transporter = createTransport({
        host: 'smtp.resend.com',
        port: 587,
        auth: {
            user: process.env.RESEND_USER,
            pass: process.env.RESEND_PASS
        }
    });

    // Define email options
    const mailOptions = {
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your Chart Image',
        text: 'Please find the attached chart image.',
        attachments: [
            {
                filename: 'chart.png',
                content: image.split('base64,')[1],
                encoding: 'base64'
            }
        ]
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
            return res.status(500).json({ success: false, error: error.message });
        }
        console.log('Email sent: ', info.response);
        res.status(200).json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});