import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB;
const client = new MongoClient(uri);

let instance = null;

async function getConnection() {
  try {
    if (instance == null) {
      instance = await client.connect();
    }
  } catch (error) {
    console.log(error.getMessage());
  }
  return instance;
}

export { getConnection };
