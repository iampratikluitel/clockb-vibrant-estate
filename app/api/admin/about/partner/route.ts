import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextRequest, NextResponse } from "next/server";

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
    const data = await Partner.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Partner by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await Partner.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No Testimonial Found" }, { status: 404 });
    }

    await Partner.deleteOne({ _id });
    if (exisitingDoc.logo != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.logo
      );
    }
    return NextResponse.json({ message: "Testimonial Deleted" }, { status: 201 });

    }else{
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
  }
}