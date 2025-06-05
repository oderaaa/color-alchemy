import {
  getUserStats,
  recordGameResult,
} from "../../services/user/userServices.js";
import { requirePermission } from "../../permissions/permissionResolvers.js";

const userResolvers = {
  Query: {
    queryStats: requirePermission("queryStats")(
      async (_parent, _args, context) => {
        return await getUserStats(context.user!._id);
      }
    ),
  },

  Mutation: {
    recordGame: requirePermission("recordGame")(
      async (_parent, { won }, context) => {
        return await recordGameResult(context.user!._id, won);
      }
    ),
  },
};

export default userResolvers;
