import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();
interface AppEnv {
  DATABASE_URL: string;
  // ACCESS_TOKEN_SECRET: string;
  // REFRESH_TOKEN_SECRET: string;
  AUTH_GOOGLE_ID: string;
  // GOOGLE_OAUTH_REDIRECT_URL: string;
}

// Access and validate environment variables
const getAppEnvs = (): AppEnv => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }
  // if (!process.env.ACCESS_TOKEN_SECRET) {
  //   throw new Error(
  //     "ACCESS_TOKEN_SECRET is not defined in the environment variables"
  //   );
  // }
  // if (!process.env.REFRESH_TOKEN_SECRET) {
  //   throw new Error(
  //     "REFRESH_TOKEN_SECRET is not defined in the environment variables"
  //   );
  // }
  if (!process.env.AUTH_GOOGLE_ID) {
    throw new Error(
      "AUTH_GOOGLE_ID is not defined in the environment variables"
    );
  }
  // if (!process.env.GOOGLE_OAUTH_REDIRECT_URL) {
  //   throw new Error(
  //     "GOOGLE_OAUTH_REDIRECT_URL is not defined in the environment variables"
  //   );
  // }

  return {
    DATABASE_URL: process.env.DATABASE_URL,
    // ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    // REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    // GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
  };
};

export const AppEnvs = getAppEnvs();
