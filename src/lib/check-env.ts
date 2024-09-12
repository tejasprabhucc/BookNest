import { AppEnvs } from "./read-env";

export function checkEnv() {
  console.log("\nGOOGLE ID: ", AppEnvs.AUTH_GOOGLE_ID);
  console.log("\nDATABASE URL: ", AppEnvs.DATABASE_URL);
}
