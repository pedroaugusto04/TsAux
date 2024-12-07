import { config } from 'dotenv';
import postgres from 'postgres';
config();

export async function databaseConnection() {
  const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

  if (!PG_HOST || !PG_PORT || !PG_DATABASE || !PG_USERNAME || !PG_PASSWORD) {
    throw new Error('Configure as variáveis de ambiente!');
  }

  return postgres({
    host: PG_HOST,
    port: parseInt(PG_PORT, 10),
    database: PG_DATABASE,
    username: PG_USERNAME,
    password: PG_PASSWORD,
    ssl:true
  });
}

export default databaseConnection;