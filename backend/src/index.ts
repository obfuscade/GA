import connectToDb from "./database/connectToDb";
import config from "./providers/config";
import app from "./app";
import logger from "./providers/logger";

const start = async (): Promise<void> => {
  try {
    const port = config.get("server").port;

    await connectToDb();

    app.listen(port, () => {
      logger.info(`Server is running on port: ${port}`);
    });
  } catch (error) {
    logger.error(`Failed to start the server": ${error}`);
    process.exit(1);
  }
};

start();
