import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import LandingConfiguration from "@/model/configuration/landingConfiguration";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update LandingPage Config");

  try {
    const data = await request.json();
    await connectDb();
    console.log("MongoDb Connected for landing page");

    const existingConfig = await LandingConfiguration.findOne({ _id: data?._id });

    if (existingConfig) {
      if (existingConfig.backgroundImage && existingConfig.backgroundImage !== data.backgroundImage) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.backgroundImage);
      }
      if (existingConfig.card2icon && existingConfig.card4icon !== data.card4icon) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.card4icon);
      }
      if (existingConfig.card3icon && existingConfig.card5icon !== data.card5icon) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.card5icon);
      }
      if (existingConfig.card4icon && existingConfig.card6icon !== data.card6icon) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.card6icon);
      }
      if (existingConfig.card1icon && existingConfig.card7icon !== data.card7icon) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.card7icon);
      }

      await existingConfig.updateOne(data);
      return NextResponse.json({ message: "Updated" }, { status: 201 });
    } else {
      const newData = new LandingConfiguration({ ...data });
      await newData.save();
      return NextResponse.json({ message: "Added" }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
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
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
};
