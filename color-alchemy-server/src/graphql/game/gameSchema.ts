import { gql } from "graphql-tag";

const gameSchema = gql`
  type Game {
    width: Int!
    height: Int!
    maxMoves: Int!
    target: [Int!]!
  }

  extend type Query {
    initGame: Game
  }
`;
export default gameSchema;
