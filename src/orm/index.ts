import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import { AppEnvs } from "../lib/read-env";
import mysql from "mysql2/promise";

export function initializeDatabase() {
  try {
    const pool = mysql.createPool(AppEnvs.DATABASE_URL);
    const db: MySql2Database<Record<string, never>> = drizzle(pool);
    if (db) {
      console.log("Database connected successfully.");
      return db;
    } else {
      throw new Error("Database connection failed: ");
    }
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
}
