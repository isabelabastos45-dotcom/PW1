import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function start() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso");

    const db = client.db("db");

    const collections = await db.listCollections().toArray();
    console.log("Collections disponíveis:");
    console.log(collections.map(c => c.name));

  } catch (error) {
    console.error("Erro ao iniciar app:");
    console.error(error.message);
  }
}

start();