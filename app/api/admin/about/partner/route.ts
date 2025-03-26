import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  try {
    await connectDb();
    const data = await request.json();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await Partner.findById(data._id);
        if (existingConfig) {
          if (existingConfig.logo && existingConfig.logo !== data.logo) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.logo);
          }
          await Partner.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new Partner(data).save();
        }
      } else {
        await new Partner(data).save();
      }
      return NextResponse.json({ message: responseMessage }, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const GET = async () => {
  console.log("Running GET request: Get Footer");
  try {
    await connectDb();
    const data = await Partner.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
