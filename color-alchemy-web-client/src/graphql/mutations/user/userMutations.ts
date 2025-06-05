import { gql } from "@apollo/client";

export const RECORD_GAME_MUTATION = gql`
  mutation RecordGame($won: Boolean!) {
    recordGame(won: $won) {
      wins
      losses
    }
  }
`;
