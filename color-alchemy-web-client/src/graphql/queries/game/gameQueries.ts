import { gql } from "@apollo/client";

export const INIT_GAME = gql`
  query InitGame {
    initGame {
      width
      height
      maxMoves
      target
    }
  }
`;
