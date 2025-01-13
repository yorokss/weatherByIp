const axios = require('axios')
const dotenv = require('dotenv');
const logger = require('../logger');
dotenv.config()

let WEATHERKEY = process.env.WEATHERKEY;

const getWeatherByCityName = async (city) => {
     
      try {
        logger.infoWithMeta('Fetching weather data', { city }); 
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHERKEY}`
        );
    
        if (!response) {
          logger.errorWithMeta('Invalid response structure from weather API', { city });
          throw new Error('Invalid response from the weather API');
        }
    
        const { temp, humidity } = response.data.main;
        const description = response.data.weather[0].description;
    
        logger.infoWithMeta('Successfully retrieved weather data', {
          city,
          temperature: temp,
          humidity,
          description,
        });
    
        return { temperature: temp, humidity, description };
      } catch (error) {
    
        logger.errorWithMeta('Error fetching weather data', {
          city,
          error: error.message,
          stack: error.stack,
        });
        throw new Error('Unable to fetch weather data. Please try again later.');
      }
    };
    
    module.exports = {
      getWeatherByCityName,
    };
module.exports={
      getWeatherByCityName
}
