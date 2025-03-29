import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { LandingConfiguration } from "@/model/configuration/landingConfiguration";

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
        const existingConfig = await LandingConfiguration.findById(data._id);
        if (
          existingConfig.backgroundImage &&
          existingConfig.backgroundImage !== data.backgroundImage
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.backgroundImage);
        }

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
        await LandingConfiguration.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        responseMessage = "Updated";
      } else {
        await new LandingConfiguration(data).save();
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
  console.log("Running GET request: Get Landing Configuration");
  try {
    await connectDb();
    const data = await LandingConfiguration.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
