import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import brochureConfiguration from "@/model/configuration/brochureConfiguration";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: BROCHURE");

  const user = await currentUser();
  console.log("user", user)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    await connectDb();

    let responseMessage = "Added";

    if (data?._id) {
      const existingConfig = await brochureConfiguration.findById(data._id);

      if (existingConfig) {
        // ✅ Check if the brochure is changed and delete old file
        if (existingConfig.brochure && existingConfig.brochure !== data.brochure) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.brochure);
        }

        await brochureConfiguration.findByIdAndUpdate(data._id, data, { new: true });
        responseMessage = "Updated";
      } else {
        await new brochureConfiguration(data).save();
      }
    } else {
      await new brochureConfiguration(data).save();
    }

    return NextResponse.json({ message: responseMessage }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Brochure");
  try {
    await connectDb();
    const data = await brochureConfiguration.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
