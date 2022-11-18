import axios from "axios";
import City from "../../models/City";

export default {
  Query: {
    async getCities() {
      try {
        const cities = await City.find();
        return cities;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getCityByName(parent, { cityName }, context, info) {
      try {
        return await City.findOne({ cityName });
      } catch (e) {
        throw new Error(e);
      }
    },
    async getLatLon(parent, { cityName }, context, info) {
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
  },
  Mutation: {
    async addCity(parent, { cityName }, context, info) {
      try {
        const city = await new City({ cityName });
        return city.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteCity(parent, { id }, context, info) {
      try {
        return City.findOneAndDelete({ _id: id });
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateCity(parent, { id, cityName }, context, info) {
      try {
        let cityFields = {};
        if (cityName) {
          cityFields = { cityName };
        }
        return City.findByIdAndUpdate(id, { $set: cityFields }, { new: true });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
