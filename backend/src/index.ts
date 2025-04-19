import http, { IncomingMessage, ServerResponse } from "http";
import connectToDb from "./database/connectToDb";
import config from "./providers/config";
import logger from "./providers/logger";
import routes from "./routes";

const start = async (): Promise<void> => {
  try {
    const port = config.get("server").port;

    // Database connection
    await connectToDb();

    // Server creation
    const server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        // Rout connection
        routes(req, res);
      },
    );

    // Server listening
    server.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (error) => {
      logger.error(`Unhandled Rejection: ${error}`);
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      logger.error(`Uncaught Exception: ${error}`);
      process.exit(1);
    });
  } catch (error: unknown) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

start();
