const express = require('express');
const router = express.Router();
const { getDetails,updateDetails } = require('../controllers/operatorControllerr');

router.get('/operation/getting-operator', getDetails);
router.post('/operation/updating-ticketop', updateDetails);



module.exports = router;