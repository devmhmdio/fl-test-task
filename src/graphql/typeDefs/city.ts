import { gql } from "apollo-server";

export default gql`
  scalar JSON
  type City {
    id: ID!
    cityName: String!
  }

  type FiveDayForecastDetail {
    dt_txt: String
    weather: [JSON]
    wind: JSON
  }

  type FiveDayForecast {
    FiveDayForecastDetail: [FiveDayForecastDetail]
    error: String
  }

  type ForecastAllCities {
    FiveDayForecastDetail: [FiveDayForecastDetail]
    City: String
  }

  type Query {
    getCities: [City]
    getFiveDayWeatherForecast(cityName: String!): FiveDayForecast
    getCityByName(cityName: String!): City
    getFiveDayWeatherForecastAllCities: [ForecastAllCities]
  }

  type Mutation {
    addCity(cityName: String!): City
  }
`;
