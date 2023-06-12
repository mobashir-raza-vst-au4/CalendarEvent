const nodemailer = require('nodemailer');
const Event = require('./../models/event');
const moment = require('moment-timezone');

require('dotenv').config()

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

const sendMail = async (req, res) => {
    console.log("called")
    const currentTime = new Date().getTime();
    const tenMinutesLater = currentTime + 10 * 60 * 1000;

    // Find events that are starting within the next 10 minutes
    // dateTime: { $gte: currentTime, $lt: tenMinutesLater }, 
    const events = await Event.find({ is_mail_sent: false }).populate('user');

    console.log("events find..", events)
    for (const event of events) {
        const { user, title, dateTime } = event;

        // Send email notification to the user
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: user.email,
            subject: 'Event Reminder',
            text: `Event "${title}" is starting at ${moment(dateTime).format('lll')}. Don't forget to attend!`,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
                // Update is_mail_sent field
                event.is_mail_sent = true;
                await event.save();
            }
        });
    }
}

module.exports = { sendMail }