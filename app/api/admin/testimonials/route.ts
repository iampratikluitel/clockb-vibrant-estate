import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import Testimonials from "@/model/testimonial/testimonial";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Testimonials");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingDoc = await Testimonials.findOne({ _id: Data?._id });
      if (existingDoc) {
        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Testimonial Updated" }, { status: 201 });
      } else {
        const newDoc = new Testimonials({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Testimonial Added" },
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
  console.log("Running GET request: Get all Testimonials");

  try {
    await connectDb();
    const docs = await Testimonials.find().sort({
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
  console.log("Running DELETE request: Admin DELETE Testimonial by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await Testimonials.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No Testimonial Found" }, { status: 404 });
    }

    await Testimonials.deleteOne({ _id });
    if (exisitingDoc.image != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.image
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