import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function listDatabases() {
  try {
    await client.connect();

    const admin = client.db().admin();
    const result = await admin.listDatabases();

    console.log("Consulta realizada com sucesso");

    let totalSize = 0;

    console.log("Bancos de dados:");
    result.databases.forEach(db => {
      console.log(`- ${db.name} | sizeOnDisk: ${db.sizeOnDisk} bytes`);
      totalSize += db.sizeOnDisk;
    });

    console.log("Tamanho total do cluster:");
    console.log(`${totalSize} bytes`);

  } catch (error) {
    console.log("Erro ao listar bancos de dados");
    console.log("Motivo:", error.message);

  } finally {
    await client.close();
  }
}

listDatabases();