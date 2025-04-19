import "dotenv/config";

type Config = {
  server: {
    port: number;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
};

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  SERVER_PORT,
} = process.env;

export class ConfigProvider {
  private readonly config: Config = {
    server: {
      port: Number(SERVER_PORT || 3001),
    },
    database: {
      host: POSTGRES_HOST || "postgres",
      port: Number(POSTGRES_PORT || 5432),
      user: POSTGRES_USER || "user",
      password: POSTGRES_PASSWORD || "password",
      database: POSTGRES_DATABASE || "postgres",
    },
  };

  get<T extends keyof Config>(key: T): Config[T] {
    return this.config[key];
  }
}

export default new ConfigProvider();
