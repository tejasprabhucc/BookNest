import { defineConfig } from "drizzle-kit";
import { AppEnvs } from "@/src/lib/read-env";

export default defineConfig({
  schema: "./src/orm/schema.js",
  out: "./src/orm/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: AppEnvs.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
