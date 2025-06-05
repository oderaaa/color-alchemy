import { makeExecutableSchema } from "@graphql-tools/schema";

import userSchema from "./user/userSchema.js";
import userResolvers from "./user/userResolvers.js";
import gameSchema from "./game/gameSchema.js";
import gameResolvers from "./game/gameResolvers.js";
import baseSchema from "./baseSchema.js";

const typeDefs = [baseSchema, userSchema, gameSchema];
const resolvers = [userResolvers, gameResolvers];

const mergedSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default mergedSchema;
