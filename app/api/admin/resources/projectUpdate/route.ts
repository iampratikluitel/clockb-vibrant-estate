import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Report from "@/model/resources/ProjectUpdates";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Project Update");
  const user = await currentUser();

  try {
    const data = await request.json();
    await connectDb();

    if (user) {
      const existingDoc = await Report.findOne({ _id: data?._id });
      if (existingDoc) {
        await existingDoc.updateOne(data);
        return NextResponse.json({ message: "Project Update Modified" }, { status: 201 });
      } else {
        const newDoc = new Report({ ...data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Project Update Added" },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error in project update POST:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get all Project Updates");

  try {
    await connectDb();
    const updates = await Report.find().sort({ date: -1 });
    return NextResponse.json(updates, { status: 200 });
  } catch (error) {
    console.error("Error in project update GET:", error);
    return NextResponse.json(
      { error: "Failed to fetch project updates" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Delete Project Update");
  const user = await currentUser();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDb();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existingDoc = await Report.findOne({ _id: id });
    if (!existingDoc) {
      return NextResponse.json({ error: "Project update not found" }, { status: 404 });
    }

    await existingDoc.deleteOne();
    return NextResponse.json({ message: "Project update deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in project update DELETE:", error);
    return NextResponse.json(
      { error: "Failed to delete project update" },
      { status: 500 }
    );
  }
};