import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import LandingConfiguration from "@/model/configuration/landingConfiguration";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update LandingPage Config");

  const user = await currentUser();

  try {
    const data = await request.json();
    console.log
    await connectDb();
    console.log("Landing page api mongodb connected");

    if (user) {
      const existingConfig = await LandingConfiguration.findOne({
        _id: data?._id,
      });
      if (existingConfig) {
        if (
          existingConfig.backgroundImage &&
          existingConfig.backgrounImage != data.backgroundImage
        ) {
          await minioClient.removeObject(
            BUCKET_NAME,
            existingConfig.backgroundImage
          );
        }
        if (
          existingConfig.card4icon &&
          existingConfig.card4icon != data.card4icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card4icon);
        }
        if (
          existingConfig.card5icon &&
          existingConfig.card5icon != data.card5icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card5icon);
        }
        if (
          existingConfig.card6icon &&
          existingConfig.card6icon != data.card6icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card6icon);
        }

        if (
          existingConfig.card7icon &&
          existingConfig.card7icon != data.card7icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card7icon);
        }
        if (
          existingConfig.card8icon &&
          existingConfig.card8icon != data.card8icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card8icon);
        }
        if (
          existingConfig.card9icon &&
          existingConfig.card9icon != data.card9icon
        ) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.card9icon);
        }
        if (
          existingConfig.card10icon &&
          existingConfig.card10icon != data.card10icon
        ) {
          await minioClient.removeObject(
            BUCKET_NAME,
            existingConfig.card10icon
          );
        }

        if (
          existingConfig.card11icon &&
          existingConfig.card11icon != data.card11icon
        ) {
          await minioClient.removeObject(
            BUCKET_NAME,
            existingConfig.card11icon
          );
        }
        if (
          existingConfig.card12icon &&
          existingConfig.card12icon != data.card12icon
        ) {
          await minioClient.removeObject(
            BUCKET_NAME,
            existingConfig.card12icon
          );
        }
        if (
          existingConfig.card13icon &&
          existingConfig.card13icon != data.card13icon
        ) {
          await minioClient.removeObject(
            BUCKET_NAME,
            existingConfig.card13icon
          );
        }
        await existingConfig.updateOne(data);
        return NextResponse.json({ message: "Update" }, { status: 200 });
      } else {
        const newData = new LandingConfiguration({ ...data });
        await newData.save();
        return NextResponse.json({ message: "Added" }, { status: 201 });
      }
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
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
