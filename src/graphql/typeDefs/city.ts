import { gql } from "apollo-server";

export default gql`
  scalar JSON
  type City {
    id: ID!
    cityName: String!
  }

  type LatLon {
    lon: Float!
    lat: Float!
  }

  type FiveDayForecastDetail {
    dt_txt: String
    weather: [JSON]
    wind: JSON
  }

  type FiveDayForecast {
    FiveDayForecastDetail: [FiveDayForecastDetail]
    error: JSON
  }

  type Query {
    getCities: [City]
    getLatLon(cityName: String!): FiveDayForecast
    getCityByName(cityName: String!): City
  }

  type Mutation {
    addCity(cityName: String!): City
    deleteCity(cityName: String!): City
    updateCity(cityName: String!): City
  }
`;
