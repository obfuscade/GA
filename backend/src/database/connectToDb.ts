import pool from "./pool";
import logger from "../providers/logger";

const connectToDb = async (): Promise<void> => {
  try {
    await pool.connect();
    logger.info("Connected to PostgreSQL database");
  } catch (error) {
    logger.error("Error connecting to PostgreSQL database", { error });
  }
};

export default connectToDb;
