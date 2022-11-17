import cityResolvers from "./cities";

export default {
  Query: {
    ...cityResolvers.Query,
  },
  Mutation: {
    ...cityResolvers.Mutation,
  },
};
