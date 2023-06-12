// routes/auth.js

const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, deleteEvent, updateEvent } = require('./../controller/event')
const verify = require('./../middleware/verifyToken');
const verifyOwnershp = require('../middleware/verifyOwnershp');
const { sendMail } = require('../controller/sendNotification');

router.post('/create', verify, createEvent);
router.get('/get-events', verify, getAllEvents);
router.patch('/:id/update', verify, verifyOwnershp, updateEvent);
router.delete('/:id/delete', verify, verifyOwnershp, deleteEvent);
router.get('/trigger-mail', sendMail);

module.exports = router;