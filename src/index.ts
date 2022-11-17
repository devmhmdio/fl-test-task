import { ApolloServer } from "apollo-server";
import env from "./environment";
import connectDB from "./config/db";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = env.getPort();
server.listen({ port: process.env.PORT || PORT }).then(async ({ url }) => {
  await connectDB();
  console.log(`Server is ready at ${url}`);
});
