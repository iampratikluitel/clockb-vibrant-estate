const { MongoClient } = require('mongodb');
require('dotenv').config();

async function migrateDates() {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('LegalDocument');

    // Find all documents with string dates
    const docs = await collection.find({ date: { $type: "string" } }).toArray();
    console.log(`Found ${docs.length} documents with string dates`);

    // Convert each document's date to a proper Date object
    for (const doc of docs) {
      const jsDate = new Date(doc.date);
      await collection.updateOne(
        { _id: doc._id },
        { $set: { date: jsDate } }
      );
      console.log(`Updated document ${doc._id}`);
    }

    console.log('✅ All string dates in LegalDocument.date have been converted to real Dates.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

migrateDates(); 