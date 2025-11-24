const { Client } = require("pg");
require("dotenv").config();

const SQL = `
  CREATE TABLE IF NOT EXISTS roles (
    id integer GENERATED ALWAYS AS IDENTITY,
    role_name text,
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id integer GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    last_name text NOT NULL,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id),
    role_id integer 
      REFERENCES roles (id) 
      ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id integer GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    message text NOT NULL,
    upload_date date NOT NULL,
    PRIMARY KEY (id),
    author_id integer 
      REFERENCES users (id)
      ON DELETE CASCADE
  );

  INSERT INTO roles (role_name)
  VALUES 
    ('admin'),
    ('club'),
    ('guest');
`;

async function main() {
  console.log("starting...");

  const connectionString =
    process.argv[2] ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`;

  const client = new Client({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
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
