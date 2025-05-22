import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Brochure from "@/model/configuration/brochureConfiguration";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const brochure = await Brochure.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(brochure || null);
  } catch (error) {
    console.error("Error fetching investor kit:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor kit" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await currentUser();

  try {
    await connectDb();
    const data = await request.json();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await Brochure.findById(data._id);
        if (existingConfig) {
          if (
            existingConfig.fileUrl &&
            existingConfig.fileUrl !== data.fileUrl
          ) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.fileUrl);
          }
          await Brochure.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new Brochure(data).save();
        }
      } else {
        await new Brochure(data).save();
      }
      return NextResponse.json({ message: responseMessage }, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
