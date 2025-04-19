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
  jwt: {
    expiresIn: number;
    secret: string;
    passwordSalt: number;
  };
  cors: {
    origin: string;
    methods: string[];
    allowedHeaders: string;
    optionsSuccessStatus: number;
  };
};

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  SERVER_PORT,
  EXPIRES_IN,
  TOKEN_SECRET,
  PASSWORD_SALT,
  ORIGIN,
  METHODS,
  ALLOWED_HEADERS,
  OPTIONS_SUCCESS_STATUS,
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
    jwt: {
      expiresIn: Number(EXPIRES_IN || 86400000),
      secret: TOKEN_SECRET || "secret",
      passwordSalt: Number(PASSWORD_SALT || 10),
    },
    cors: {
      origin: ORIGIN || "",
      methods: (METHODS || "").split(","),
      allowedHeaders: ALLOWED_HEADERS || "",
      optionsSuccessStatus: Number(OPTIONS_SUCCESS_STATUS),
    },
  };

  get<T extends keyof Config>(key: T): Config[T] {
    return this.config[key];
  }
}

export default new ConfigProvider();
