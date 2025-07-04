const express = require('express');
const router = express.Router();
const { getDetails } = require('../controllers/operatorController');
const {deleteDetailsO , deleteDetailsU ,getDetailsU,addOperator }=require('../controllers/adminController') 


router.post('/delete-adminuser/:id',deleteDetailsU);
router.post('/delete-adminop/:id',deleteDetailsO);
router.get('/getting-operator', getDetails);
router.get('/getting-user', getDetailsU);
router.post('/adding-op', addOperator);

module.exports = router;

