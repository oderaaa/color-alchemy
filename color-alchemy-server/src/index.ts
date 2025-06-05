import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import {
  expressMiddleware,
  ExpressContextFunctionArgument,
} from "@apollo/server/express4";
import { AuthenticationError } from "apollo-server-errors";
import { Context } from "./types/types";
import mergedSchema from "./graphql/index.js";
import authRoutes from "./routes/auth/authRoutes.js";
import {
  errorHandler,
  mongooseErrorHandler,
} from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";
import jwt from "jsonwebtoken";
import { UserPayload, GUEST_USER } from "./models/user/types.js";
import "./config/env.js";

const app = express();
const server = createServer(app);
app.set("port", process.env.PORT || 9876);

app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Timeout handler
app.use((req, res, next) => {
  res.setTimeout(Number(process.env.REQUEST_TIMEOUT) || 50000, () =>
    res.status(408).json({ error: true, message: "Request timed out" })
  );
  next();
});

// MongoDB connection
logger.info(`Database URI: ${process.env.DB_URI}`);
mongoose
  .connect(process.env.DB_URI || "", {
    connectTimeoutMS: Number(process.env.DB_CONNECTION_TIMEOUT) || 5000,
  })
  .then(() => logger.info("✅ MongoDB connection successful"))
  .catch((err) => logger.error(`❌ MongoDB error: ${err.message}`));

const context = async ({
  req,
}: ExpressContextFunctionArgument): Promise<Context> => {
  const cookies = (req as unknown as { cookies: Record<string, string> })
    .cookies;
  const token = cookies?.accessToken;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET! || ""
      ) as UserPayload;
      return { user: decoded };
    } catch (error) {
      throw new AuthenticationError(
        "Unauthorized access, invalid or expired token"
      );
    }
  }
  return { user: GUEST_USER };
};

// Apollo Server setup
const apolloServer = new ApolloServer({
  schema: mergedSchema,
  formatError: (err) => {
    logger.error(`[GraphQL Error]: ${err.message}`, {
      path: err.path,
      extensions: err.extensions,
    });
    return {
      message: err.message,
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      path: err.path,
    };
  },
  introspection: true,
});

//const graphqlMiddleware: RequestHandler = await expressMiddleware(apolloServer, { context });

const startApolloServer = async () => {
  try {
    logger.info("🚀 Starting Apollo Server...");
    await apolloServer.start();

    app.use("/auth", authRoutes);

    const graphqlMiddleware = await expressMiddleware(apolloServer, {
      context,
    });
    app.use("/graphql", graphqlMiddleware as unknown as express.RequestHandler);

    app.use(mongooseErrorHandler);
    app.use(errorHandler);

    server.listen(app.get("port"), () => {
      logger.info(
        `✅ Server running on http://localhost:${app.get("port")}/graphql`
      );
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`❌ Apollo server error: ${err.message}`);
    } else {
      logger.error("❌ Unknown error starting Apollo Server");
    }
    process.exit(1);
  }
};

startApolloServer();
