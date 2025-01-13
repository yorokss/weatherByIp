const axios = require('axios')
const dotenv = require('dotenv');
const logger = require('../logger');
dotenv.config()

let IP_KEY = process.env.IP_KEY;
const getLocationByIp = async (ip) => {
  try {
    logger.infoWithMeta('Fetching location data', { ip }); 
    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${IP_KEY}`
    );
    if (!response.data) {
      logger.errorWithMeta('No data found for IP', { ip }); 
      throw new Error('No data found');
    }
    const { city, country } = response.data;
    if (!city || !country) {
      logger.errorWithMeta('Incomplete data received from location API', { ip, response: response.data });
      throw new Error('Incomplete location data');
    }
    logger.infoWithMeta('Successfully retrieved location data', { ip, city, country });
    return { city: city.toString(), country };
  } catch (error) {
    logger.errorWithMeta('Error fetching location data', {
      ip,
      error: error.message,
      stack: error.stack,
    });


    return null;
  }
};
module.exports={getLocationByIp}