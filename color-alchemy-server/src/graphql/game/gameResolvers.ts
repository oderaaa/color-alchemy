import { initGame } from "../../services/game/gameServices.js";

const gameResolvers = {
  Query: {
    initGame: async (_parent: any, _args: any, context: any) => {
      return initGame();
    },
  },
};

export default gameResolvers;
