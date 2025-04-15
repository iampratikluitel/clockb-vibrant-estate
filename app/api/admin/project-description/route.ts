import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import UpcommingProject from "@/model/project-description/project-description";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  try {
    await connectDb();
    const data = await request.json();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await UpcommingProject.findById(data._id);
        if (existingConfig) {
          if (existingConfig.image && existingConfig.image !== data.image) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.image);
          }
          await UpcommingProject.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new UpcommingProject(data).save();
        }
      } else {
        await new UpcommingProject(data).save();
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
  console.log("Running GET request to fetch upcoming projects");
  try {
    await connectDb();
    const data = await UpcommingProject.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
