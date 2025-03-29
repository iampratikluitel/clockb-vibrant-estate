import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { LandingThirdSection } from "@/model/configuration/landingConfiguration";

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
        const existingConfig = await LandingThirdSection.findById(data._id);
        if (
          existingConfig.card8icon &&
          existingConfig.card8icon !== data.card8icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card8icon);
        }

        if (
          existingConfig.card9icon &&
          existingConfig.card9icon !== data.card9icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card9icon);
        }

        if (
          existingConfig.card10icon &&
          existingConfig.card10icon !== data.card10icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card3icon);
        }
        await LandingThirdSection.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        responseMessage = "Updated";
      } else {
        await new LandingThirdSection(data).save();
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
    const data = await LandingThirdSection.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
