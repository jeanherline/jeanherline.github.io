const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

app.post('/reservation', (req, res) => {
  const { reservationType, fullName, email, date, time, guests } = req.body;

  // Handle reservation logic here (e.g., save to database)

  // Sending a confirmation email (optional)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nubcapstone@gmail.com',
      pass: '@Capstone2024'
    }
  });

  const mailOptions = {
    from: 'nubcapstone@gmail.com',
    to: email,
    subject: 'Reservation Confirmation',
    text: `Dear ${fullName},\n\nYour reservation for ${reservationType} on ${date} at ${time} for ${guests} guests has been confirmed.\n\nThank you!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Reservation received' });
    }
  });
});

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Handle contact logic here (e.g., save to database, send email)

  // Sending a notification email (optional)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nubcapstone@gmail.com',
      pass: '@Capstone2024'
    }
  });

  const mailOptions = {
    from: email,
    to: 'nubcapstone@gmail.com',
    subject: `New message from ${name}: ${subject}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Contact message received' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
