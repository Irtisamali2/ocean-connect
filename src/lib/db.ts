import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDbPool() {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL (or MYSQL_URL) environment variable');
  }

  pool = mysql.createPool({
    uri: databaseUrl,
    connectionLimit: 10,
    enableKeepAlive: true,
  });

  return pool;
}
