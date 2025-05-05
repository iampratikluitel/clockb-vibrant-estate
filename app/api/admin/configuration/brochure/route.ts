import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Brochure from "@/model/configuration/brochureConfiguration";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: BROCHURE");

  const user = await currentUser();
  console.log("user", user);
  try {
    const data = await request.json();
    await connectDb();

    let responseMessage = "Added";
    if (user) {
      if (data?._id) {
        const existingConfig = await Brochure.findById(data._id);
        if (existingConfig) {
          if (
            existingConfig.brochure &&
            existingConfig.brochure !== data.brochure
          ) {
            await minioClient.removeObject(
              BUCKET_NAME,
              existingConfig.brochure
            );
          }

          await Brochure.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new Brochure(data).save();
        }
      } else {
        await new Brochure(data).save();
      }
    }

    return NextResponse.json({ message: responseMessage }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Brochure");
  try {
    await connectDb();
    const data = await Brochure.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running Delete request");
  const user = await currentUser();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");
  try {
    await connectDb();
    if (user) {
      const existingConfig = await Brochure.findOne({ _id });
      if (!existingConfig) {
        return NextResponse.json(
          { message: "No Brochure Found" },
          { status: 404 }
        );
      }

      await Brochure.deleteOne({ _id });
      if (existingConfig.brochure != null) {
        await minioClient.removeObject(BUCKET_NAME, existingConfig.brochure);
      }
      return NextResponse.json(
        { message: "Brochure Deleted" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 404 }
    );
  }
};
