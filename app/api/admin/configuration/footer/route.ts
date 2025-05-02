import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import FooterConfiguration from "@/model/configuration/footerConfiguration";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Footer Config");
  const user = await currentUser();
  try {
    const data = await request.json();
    await connectDb();
    console.log("MongoDB Connected");

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await FooterConfiguration.findById(data._id);
        if (existingConfig) {
          if (existingConfig.logo && existingConfig.logo !== data.logo) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.logo);
          }
          await FooterConfiguration.findByIdAndUpdate(data._id, data, {
            new: true,
          });
          responseMessage = "Updated";
        } else {
          await new FooterConfiguration(data).save();
        }
      } else {
        await new FooterConfiguration(data).save();
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
    const data = await FooterConfiguration.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
