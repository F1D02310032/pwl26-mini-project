const express = require('express');
const controller = require('../controllers/screeningController');
const { validateScreening } = require('../validators/screeningValidator');

const router = express.Router();

router.post('/', validateScreening, controller.create);

module.exports = router;
