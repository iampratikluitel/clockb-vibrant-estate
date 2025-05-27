import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Brochure from "@/model/configuration/brochureConfiguration";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Connecting to database...");
    await connectDb();

    console.log("Fetching latest brochure...");
    const brochure = await Brochure.findOne().sort({ updatedAt: -1 });

    console.log("Fetched brochure:", brochure);
    return NextResponse.json(brochure || null);
  } catch (error) {
    console.error("Error fetching Brochure:", error);
    return NextResponse.json(
      { error: "Failed to fetch Brochure" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await currentUser();
  console.log("Current user:", user);

  try {
    console.log("Connecting to database...");
    await connectDb();

    const data = await request.json();
    console.log("Received data:", data);

    if (user) {
      if (data?._id) {
        console.log("Updating existing brochure with ID:", data._id);

        const existingConfig = await Brochure.findById(data._id);
        console.log("Existing config:", existingConfig);

        if (existingConfig) {
          if (
            existingConfig.fileUrl &&
            existingConfig.fileUrl !== data.fileUrl
          ) {
            console.log("Removing old file from MinIO:", existingConfig.fileUrl);
            await minioClient.removeObject(BUCKET_NAME, existingConfig.fileUrl);
          }

          const updated = await Brochure.findByIdAndUpdate(data._id, data, {
            new: true,
          });

          console.log("Updated brochure:", updated);
          return NextResponse.json(updated, { status: 200 });
        }
      }

      console.log("Creating new brochure...");
      const newBrochure = await new Brochure(data).save();
      console.log("Created brochure:", newBrochure);
      return NextResponse.json(newBrochure, { status: 200 });
    }

    console.warn("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
