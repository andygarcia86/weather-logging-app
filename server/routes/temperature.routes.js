const express = require('express');
const router = express.Router();

const temperatureCtrl = require('../controllers/temperature.controller');

router.get('/temperature', temperatureCtrl.getLogs);

router.get('/temperature/statistics', temperatureCtrl.getStatistics);

router.post('/temperature', temperatureCtrl.addLog);

router.delete('/temperature:id', temperatureCtrl.deleteLog);

module.exports = router;