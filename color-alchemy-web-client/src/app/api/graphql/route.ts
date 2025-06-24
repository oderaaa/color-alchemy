import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import dbConnect from "@/lib/db";
import mergedSchema from "@/server/graphql";
import { Context } from "@/server/types/types";
import { extractUserFromToken } from "@/server/utils/authHelper";

const server = new ApolloServer<Context>({
  schema: mergedSchema,
  introspection: true,
  formatError: (err) => {
    console.error("[GraphQL Error]:", err.message);
    return {
      message: err.message,
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      path: err.path,
    };
  },
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    await dbConnect();

    const cookieHeader = req.headers.get("cookie");
    const user = extractUserFromToken(cookieHeader);

    return { user };
  },
});

export { handler as GET, handler as POST };
