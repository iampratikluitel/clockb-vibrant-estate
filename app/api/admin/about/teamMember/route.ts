import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update TeamMembers");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingDoc = await TeamMember.findOne({ _id: Data?._id });
      if (existingDoc) {
        //check if image has been changed or not if yes delete previous one
        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "TeamMember Updated" }, { status: 201 });
      } else {
        const newDoc = new TeamMember({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New TeamMember Added" },
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
  console.log("Running GET request: Get all TeamMembers");

  try {
    await connectDb();
    const docs = await TeamMember.find().sort({
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
  console.log("Running DELETE request: Admin DELETE TeamMember by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await TeamMember.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No TeamMember Found" }, { status: 404 });
    }

    await TeamMember.deleteOne({ _id });
    if (exisitingDoc.image != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.image
      );
    }
    return NextResponse.json({ message: "TeamMember Deleted" }, { status: 201 });

    }else{
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
  }
}