import { MongoClient } from 'mongodb';

const connectionURL = process.env.mongodb_host;
const databaseName = process.env.mongodb_database;
const username = process.env.mongodb_username;
const password = process.env.mongodb_password;

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb://${username}:${password}@${connectionURL}?authSource=admin`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(databaseName);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function find(client, collection, filter, sort) {
  const db = client.db(databaseName);
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
