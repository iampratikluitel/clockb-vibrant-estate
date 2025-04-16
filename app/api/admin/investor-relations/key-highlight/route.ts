import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import keyHighlights from "@/model/investor-relation/key-highlight";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();

  try {
    const data = await request.json();
    await connectDb();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await keyHighlights.findById(data._id);
        if (
          existingConfig.card1icon &&
          existingConfig.card1icon !== data.card1icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card1icon);
        }

        if (
          existingConfig.card2icon &&
          existingConfig.card2icon !== data.card2icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card2icon);
        }

        if (
          existingConfig.card3icon &&
          existingConfig.card3icon !== data.card3icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card3icon);
        }
        await keyHighlights.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        responseMessage = "Updated";
      } else {
        await new keyHighlights(data).save();
      }
      return NextResponse.json({ message: responseMessage }, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Footer");
  try {
    await connectDb();
    const data = await keyHighlights.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
