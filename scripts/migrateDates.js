import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Please set DATABASE_URL in your .env");
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(); // uses DB name from URL
    const col = db.collection("LegalDocument");

    // Find all docs where `date` is a string
    const cursor = col.find({ date: { $type: "string" } });
    let count = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const parsed = new Date(doc.date);
      if (isNaN(parsed.valueOf())) {
        console.warn(`⚠️ Skipping invalid date string on _id=${doc._id}:`, doc.date);
        continue;
      }

      await col.updateOne(
        { _id: doc._id },
        { $set: { date: parsed } }
      );
      count++;
    }

    console.log(`✅ Converted ${count} documents' date fields to BSON Date.`);
  } finally {
    await client.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
}); 