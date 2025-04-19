import { Pool } from "pg";
import config from "../providers/config";

const { host, port, user, password, database } = config.get("database");

const pool: Pool = new Pool({
  host,
  port,
  user,
  password,
  database,
});

export default pool;
