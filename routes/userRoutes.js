const express = require('express');
const router = express.Router();
const { auth , authup , getDetails, createTicket , getTickets } = require('../controllers/userController');
const protect = require('../middlware/auth');


router.get('/getting-tickets/:id', getTickets);
router.post('/creating-ticket',protect, createTicket);
router.get('/getting-user/:id', getDetails);
router.post('/auth', auth);
router.post('/authup', authup);

module.exports = router;