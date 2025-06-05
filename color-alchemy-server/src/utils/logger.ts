import winston from "winston";
import { mkdirp } from "mkdirp";
import { ApolloServerPlugin } from "@apollo/server";

// Ensure logs directory exists
mkdirp.sync("logs");

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logs/application.log" }),
  ],
});

// GraphQL plugin to log resolver calls only in development
export const resolverLoggerPlugin: ApolloServerPlugin = {
  requestDidStart: async () => {
    // Only log resolvers in development environment
    const isDev = process.env.ENV === "development";

    if (!isDev) return {};

    return {
      executionDidStart: async () => {
        return {
          willResolveField({ info }) {
            const resolverPath = `${info.parentType.name}.${info.fieldName}`;
            logger.info(`🔍 GraphQL Resolver Called: ${resolverPath}`);
          },
        };
      },
    };
  },
};

export default logger;
