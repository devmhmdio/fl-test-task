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
    async getCity(parent, { id }, context, info) {
      try {
        return City.findById(id);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addCity(parent, { cityname }, context, info) {
      try {
        const city = await new City({ cityname });
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
    async updateCity(parent, { id, cityname }, context, info) {
      try {
        let cityFields = {};
        if (cityname) {
          cityFields = { cityname };
        }
        return City.findByIdAndUpdate(id, { $set: cityFields }, { new: true });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
