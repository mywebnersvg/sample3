const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anusn2914@gmail.com', // Your Gmail address
        pass: 'nvoj xqug pcnp dlaw'  // Your Gmail App Password
    }
});
  
  const mailOptions = {
    from: 'anusn2914@gmail.com', // Your Gmail address
    to: 'anusn2914@gmail.com', // Recipient's email address
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer.',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

// API endpoint to send email
app.post('/send-email', (req, res) => {
    const { name, phoneNumber, email, city, address, productName, quantity, selectedColor, totalPrice } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: 'anusn2914@gmail.com',   // Receiver address (your Gmail)
        subject: `New Order: ${productName}`,
        text: `New Order Details:\n\n` +
              `Name: ${name}\n` +
              `Phone Number: ${phoneNumber}\n` +
              `Email: ${email}\n` +
              `City: ${city}\n` +
              `Address: ${address}\n` +
              `Product: ${productName}\n` +
              `Quantity: ${quantity}\n` +
              `Color: ${selectedColor}\n` +
              `Total Price: ${totalPrice}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});