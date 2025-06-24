import ApolloClient from "@/graphql/apolloClient";
import { INIT_GAME } from "@/graphql/queries/game/gameQueries";
import { RECORD_GAME_MUTATION } from "@/graphql/mutations/user/userMutations";
import { API_URL } from "../config";

export interface InitGameResponse {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: [number, number, number];
}

export const fetchGameInit = async (
  userId?: string
): Promise<InitGameResponse> => {
  const endpoint = userId ? `/init/user/${userId}` : "/init";
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error("Failed to fetch game data");
  return response.json();
};

export const fetchInitGameGql = async () => {
  const { data } = await ApolloClient.query({
    query: INIT_GAME,
    fetchPolicy: "no-cache",
  });

  return data.initGame;
};

export const recordGame = async (won: boolean) => {
  const { data } = await ApolloClient.mutate({
    mutation: RECORD_GAME_MUTATION,
    variables: { won },
  });

  return data.recordGame;
};
