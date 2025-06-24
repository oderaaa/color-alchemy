import { gql } from "graphql-tag";

const userSchema = gql`
  type Stats {
    wins: Int!
    losses: Int!
  }

  extend type Query {
    queryStats: Stats
  }

  extend type Mutation {
    recordGame(won: Boolean!): Stats
  }
`;
export default userSchema;
