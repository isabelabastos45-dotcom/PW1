import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function topListings() {
  try {
    await client.connect();

    const db = client.db("sample_airbnb");
    const collection = db.collection("listingsAndReviews");

    const result = await collection
      .find({
        "review_scores.review_scores_rating": { $exists: true, $gte: 80 },
        name: { $ne: "", $exists: true }
      })
      .project({
        name: 1,
        listing_url: 1,
        "review_scores.review_scores_rating": 1,
        _id: 0
      })
      .limit(10);

    const data = await result.toArray();

    console.log("Top 10 propriedades encontradas:");

    if (data.length === 0) {
      console.log("Nenhum resultado encontrado com esse filtro");
      return;
    }

    data.forEach(item => {
      console.log("Nome:", item.name);
      console.log("URL:", item.listing_url);
      console.log("Rating:", item.review_scores?.review_scores_rating);
      console.log("     ");
    });

  } catch (error) {
    console.log("Erro na consulta");
    console.log(error.message);

  } finally {
    await client.close();
  }
}

topListings();