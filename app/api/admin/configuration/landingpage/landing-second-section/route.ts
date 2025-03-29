import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { LandingSecondSection } from "@/model/configuration/landingConfiguration";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Footer Config");

  const user = await currentUser();
  console.log("user", user);

  try {
    const data = await request.json();
    await connectDb();
    console.log("MongoDB Connected");

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await LandingSecondSection.findById(data._id);
        if (
          existingConfig.card4icon &&
          existingConfig.card4icon !== data.card4icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card4icon);
        }

        if (
          existingConfig.card5icon &&
          existingConfig.card5icon !== data.card5icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card5icon);
        }

        if (
          existingConfig.card6icon &&
          existingConfig.card6icon !== data.card6icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card6icon);
        }

        if (
          existingConfig.card7icon &&
          existingConfig.card7icon !== data.card7icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card7icon);
        }

        await LandingSecondSection.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        responseMessage = "Updated";
      } else {
        await new LandingSecondSection(data).save();
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
    const data = await LandingSecondSection.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
