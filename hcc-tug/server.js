const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Store in .env file
    pass: process.env.EMAIL_PASSWORD, // Store in .env file
  },
});

// Endpoint to handle booking requests
app.post('/book-lab', (req, res) => {
  const { title, description, email, start_datetime, end_datetime } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'lab-admin@example.com',
    subject: `New Lab Booking: ${title}`,
    text: `
      Title: ${title}
      Description: ${description}
      Email: ${email}
      Start: ${start_datetime}
      End: ${end_datetime}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error submitting booking request');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Booking request submitted successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
