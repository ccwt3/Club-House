const { Client } = require("pg");
require("dotenv").config();

const SQL = `
  DROP 
`;

async function main() {
  console.log("starting...");

  const connectionString =
    process.argv[2] ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`;

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("DONE");
  } catch (err) {
    console.error("error al conectar: ", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();