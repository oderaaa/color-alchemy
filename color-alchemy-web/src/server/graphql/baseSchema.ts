import { gql } from "graphql-tag";

const baseSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
export default baseSchema;
