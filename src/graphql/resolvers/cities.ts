import axios from "axios";
import City from "../../models/City";

export default {
  Query: {
    async getCities() {
      try {
        return City.find();
      } catch (e) {
        throw new Error(e);
      }
    },
    async getCityByName(parent, { cityName }, ctx, info) {
      try {
        return City.findOne({ cityName });
      } catch (e) {
        throw new Error(e);
      }
    },
    async getFiveDayWeatherForecast(parent, { cityName }, ctx, info) {
      const findCity = await City.findOne({ cityName });
      if (findCity) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_KEY}`
          );
          const { lat, lon } = res.data.coord;
          const getFiveDayForecast = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}`
          );
          const { list } = getFiveDayForecast.data;
          return { FiveDayForecastDetail: list };
        } catch (e) {
          throw new Error(e);
        }
      } else {
        return {
          error: "City not found in database",
        };
      }
    },
    async getFiveDayWeatherForecastAllCities() {
      try {
        const cities = await City.find();
        const fiveDayForecastAllCities = [];
        for (let i = 0; i < cities.length; i++) {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cities[i].cityName}&appid=${process.env.OPEN_WEATHER_KEY}`
          );
          const { lat, lon } = res.data.coord;
          const getFiveDayForecast = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}`
          );
          const { city, list } = getFiveDayForecast.data;
          fiveDayForecastAllCities.push({
            City: city.name,
            FiveDayForecastDetail: list,
          });
        }
        return fiveDayForecastAllCities;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async addCity(parent, { cityName }, ctx, info) {
      try {
        const city = await new City({ cityName });
        return city.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
