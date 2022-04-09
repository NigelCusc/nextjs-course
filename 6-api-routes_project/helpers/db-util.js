import { MongoClient } from 'mongodb';

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'nextjs-task-application';

export async function connectDatabase() {
  const client = await MongoClient.connect(connectionURL);
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

export default { connectDatabase, insertDocument, find };
