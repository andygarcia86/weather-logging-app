const express = require('express');
const router = express.Router();

const pdfCtrl = require('../controllers/pdf.controller');

router.get('/pdf/:trackId', pdfCtrl.getPdf);

module.exports = router;