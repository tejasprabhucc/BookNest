import "dotenv/config";
import dotenv from "dotenv";

dotenv.config();
interface AppEnv {
  DATABASE_URL: string;
  AUTH_GOOGLE_ID: string;
  AUTH_SECRET: string;
  POSTGRES_URL: string;
  NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN: string;
}

const getAppEnvs = (): AppEnv => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }

  if (!process.env.AUTH_GOOGLE_ID) {
    throw new Error(
      "AUTH_GOOGLE_ID is not defined in the environment variables"
    );
  }
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined in the environment variables");
  }
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined in the environment variables");
  }
  if (!process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN) {
    throw new Error(
      "NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN is not defined in the environment variables"
    );
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
    POSTGRES_URL: process.env.POSTGRES_URL,
    NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN,
  };
};

export const AppEnvs = getAppEnvs();
