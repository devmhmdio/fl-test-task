import { gql } from "apollo-server";

export default gql`
  type City {
    id: ID!
    cityname: String!
  }
  extend type Query {
    getCities: [City]
    getCity(id: ID!): City
  }
  extend type Mutation {
    addCity(cityname: String!): City
    deleteCity(id: ID!): City
    updateCity(cityname: String!, id: ID!): City
  }
`;
