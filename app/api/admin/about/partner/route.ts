import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Partners");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingDoc = await Partner.findOne({ _id: Data?._id });
      if (existingDoc) {
        //check if logo has been changed or not if yes delete previous one
        if (existingDoc.logo && existingDoc.logo != Data.logo) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.logo);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Partner Updated" }, { status: 201 });
      } else {
        const newDoc = new Partner({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Partner Added" },
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
  console.log("Running GET request: Get all Partners");

  try {
    await connectDb();
    const docs = await Partner.find().sort({
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
  console.log("Running DELETE request: Admin DELETE Partner by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await Partner.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No Partner Found" }, { status: 404 });
    }

    await Partner.deleteOne({ _id });
    if (exisitingDoc.logo != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.logo
      );
    }
    return NextResponse.json({ message: "Partner Deleted" }, { status: 201 });

    }else{
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
  }
}