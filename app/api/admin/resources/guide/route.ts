import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Guide from "@/model/resources/Guide";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Guide");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();

    if (user) {
      const existingDoc = await Guide.findOne({ _id: Data?._id });
      if (existingDoc) {
        if (existingDoc.fileUrl && existingDoc.fileUrl != Data.fileUrl) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.fileUrl);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Guide Updated" }, { status: 201 });
      } else {
        const newDoc = new Guide({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Guide Added" },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
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
  console.log("Running GET request: Get all Guide");

  try {
    await connectDb();
    const docs = await Guide.find().sort({
      postedDate: -1,
    });
    return NextResponse.json(docs, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Guide by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await Guide.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No Guide Found" }, { status: 404 });
    }

    await Guide.deleteOne({ _id });
    if (exisitingDoc.logo != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.logo
      );
    }
    return NextResponse.json({ message: "Guide Deleted" }, { status: 201 });

    }else{
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
  }
}