import { makeExecutableSchema } from "@graphql-tools/schema";

import userSchema from "./user/userSchema";
import userResolvers from "./user/userResolvers";
import gameSchema from "./game/gameSchema";
import gameResolvers from "./game/gameResolvers";
import baseSchema from "./baseSchema";

const typeDefs = [baseSchema, userSchema, gameSchema];
const resolvers = [userResolvers, gameResolvers];

const mergedSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default mergedSchema;
