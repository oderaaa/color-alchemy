import { Context } from "../types/types";
import { GraphQLResolveInfo } from "graphql";

type Permission = "queryStats" | "recordGame";

type ResolverFn = (
  parent: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<any>;

const rolePermissions: Record<string, Record<Permission, boolean>> = {
  guest: {
    queryStats: false,
    recordGame: false,
  },
  user: {
    queryStats: true,
    recordGame: true,
  },
  admin: {
    queryStats: true,
    recordGame: true,
  },
};

export const requirePermission =
  (permission: Permission) =>
  (resolverFn: ResolverFn): ResolverFn =>
  async (parent, args, context, info) => {
    const { user } = context;

    if (!user) {
      throw new Error("You must be logged in to perform this action.");
    }

    const role = user.role || "guest";
    const isAllowed = rolePermissions[role]?.[permission];

    if (!isAllowed) {
      throw new Error("You do not have permission to perform this action.");
    }

    return resolverFn(parent, args, context, info);
  };
