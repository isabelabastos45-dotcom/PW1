import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function checkConnection() {
  try {
    await client.connect();

    console.log("Conexão com o MongoDB Atlas estabelecida");

    const admin = client.db().admin();
    const result = await admin.command({ hello: 1 });

    console.log("Hosts do cluster:");
    console.log(result.hosts || result.primary || result.me);

  } catch (error) {
    console.error("Erro na conexão:");
    console.error(error.message);
  } finally {
    await client.close();
  }
}

checkConnection();