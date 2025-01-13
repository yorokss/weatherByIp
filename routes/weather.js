const express = require('express');
const { getWeatherByIp } = require('../controllers/weatherController');
const rateLimiter = require('../middlewares/rateLimmiter');

const router = express.Router();

router.get('/weather-by-ip', rateLimiter, getWeatherByIp);

module.exports = router;
