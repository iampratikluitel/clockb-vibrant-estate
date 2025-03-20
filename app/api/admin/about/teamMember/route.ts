import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDb();
    const data = await request.json();

    let responseMessage = "Added";
    if (data?._id) {
      const existingConfig = await TeamMember.findById(data._id);
      if (existingConfig) {
        if (existingConfig.logo && existingConfig.image !== data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.image);
        }
        await TeamMember.findByIdAndUpdate(data._id, data, { new: true });
        responseMessage = "Updated";
      } else {
        await new TeamMember(data).save();
      }
    } else {
      await new TeamMember(data).save();
    }
    return NextResponse.json({ message: responseMessage }, { status: 200 });
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
    const data = await TeamMember.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
