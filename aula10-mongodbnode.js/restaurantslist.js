import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function restaurantsQuery() {
  try {
    await client.connect();

    const db = client.db("test");
    const collection = db.collection("restaurants");

    const result = await collection
      .find({
        cuisine: "American ",
        "grades.grade": "A"
      })
      .project({
        name: 1,
        borough: 1,
        cuisine: 1,
        _id: 0
      })
      .limit(10);

    const data = await result.toArray();

    console.log("Restaurantes encontrados:");

    data.forEach(r => {
      console.log("Nome:", r.name);
      console.log("Bairro:", r.borough);
      console.log("Cozinha:", r.cuisine);
      console.log("    ");
    });

  } catch (error) {
    console.log("Erro na consulta:");
    console.log(error.message);
  } finally {
    await client.close();
  }
}

restaurantsQuery();