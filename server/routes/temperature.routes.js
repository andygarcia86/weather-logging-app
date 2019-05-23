const express = require('express');
const router = express.Router();

const temperatureCtrl = require('../controllers/temperature.controller');

router.get('/', temperatureCtrl.getLogs);

router.get('/statistics', temperatureCtrl.getStatistics);

router.post('/', temperatureCtrl.addLog);

router.delete('/:id', temperatureCtrl.deleteLog);

module.exports = router;
