const { getWeatherByCityName } = require("../services/serviceWeather");
const { getLocationByIp } = require("../services/serviceIp");
const cache = require("../cache/cache");

const logger = require("../logger");

const validateIp = (ip) => {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  return ipRegex.test(ip) ? ip : null;
};

const getWeatherByIp = async (req, res, next) => {
  try {
    let ip = req.query.ip || req.ip; 
    ip = validateIp(ip);
    if (!ip) {
      logger.errorWithMeta("Invalid IP address provided", { ip: req.query.ip });
      return res.status(400).json({ error: "Invalid IP address provided." });
    }

    logger.infoWithMeta("Fetching weather by IP", { ip });

    const location = await getLocationByIp(ip);
    if (!location) {
      logger.errorWithMeta("Unable to retrieve location for IP", { ip });
      throw new Error("Unable to retrieve location.");
    }

    const cachedWeather = cache.get(location.city);
    if (cachedWeather) {
      logger.infoWithMeta("Cache hit for weather data", { city: location.city });
      return res.json(cachedWeather);
    }
    const weather = await getWeatherByCityName(location.city);
    if (!weather) {
      logger.errorWithMeta("Unable to retrieve weather for city", { city: location.city });
      throw new Error("Unable to retrieve weather.");
    }
    const response = {
      ip,
      location,
      weather,
    };
    cache.set(location.city, response, 600);
    logger.infoWithMeta("Weather data retrieved and cached", { city: location.city });

    res.json(response);
  } catch (err) {
    logger.errorWithMeta("Error in getWeatherByIp handler", {
      error: err.message,
      stack: err.stack,
    });
    next(err);
  }
};

module.exports = { getWeatherByIp };
