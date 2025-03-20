import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import brochureConfiguration from "@/model/configuration/brochureConfiguration";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    console.log("mongodb connected for brochure");

    const data = await req.formData();
    const file = data.get("brochure") as File;
    const description = data.get("description") as string;

    console.log("Received file:", file);
    console.log("Received description:", description);

    // Validate file type and description
    if (!file || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDF is allowed." }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure MongoDB connection
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not established");
    }

    // GridFS Bucket
    const bucket = new GridFSBucket(db, { bucketName: "brochures" });

    // Upload the file to GridFS and wait for completion
    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: "application/pdf",
      });

      uploadStream.end(buffer);

      uploadStream.on("finish", async () => {
        try {
          // Create the configuration entry in the database
          await brochureConfiguration.create({
            description,
            fileId: uploadStream.id,
            filename: file.name,
          });
          resolve(NextResponse.json({ message: "Uploaded successfully" }, { status: 201 }));
        } catch (err) {
          reject(NextResponse.json({ error: (err as Error).message }, { status: 500 }));
        }
      });

      uploadStream.on("error", (err) => {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Landing Configuration");
  try {
    await connectDb();
    const data = await brochureConfiguration.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
};
