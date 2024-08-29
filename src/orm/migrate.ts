import mysql from "mysql2/promise";
import { AppEnvs } from "@/src/lib/read-env";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";

async function main() {
  const migrateClient = mysql.createPool(AppEnvs.DATABASE_URL);
  const db = drizzle(migrateClient);
  await migrate(db, {
    migrationsFolder: "src/orm/migrations",
  });
  await migrateClient.end();
}

main();
