#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    date_posted TIMESTAMP(0) NOT NULL
);

INSERT INTO messages (username, message, date_posted) VALUES ('Test User 1', 'Test Message 1', NOW());

INSERT INTO messages (username, message, date_posted) VALUES ('Test User 2', 'Test Message 2', NOW());
`;

const connectionString = argv[2];

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
