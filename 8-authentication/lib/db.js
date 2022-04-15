import { MongoClient } from 'mongodb';

const connectionURL = process.env.mongodb_host;
const databaseName = process.env.mongodb_database;
const username = process.env.mongodb_username;
const password = process.env.mongodb_password;

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb://${username}:${password}@${connectionURL}?authSource=admin`
  );

  return client;
}
