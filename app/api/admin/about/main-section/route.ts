import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import AboutModel from "@/model/about/aboutMain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = await request.json();
    await connectDb();

    if (data?._id) {
      const existingData = await AboutModel.findById(data._id);
      if (existingData) {
        await existingData.updateOne(data);
        return NextResponse.json({ message: "Updated" }, { status: 201 });
      } else {
        return NextResponse.json({ error: "Data not found" }, { status: 404 });
      }
    } else {
      const newEntry = new AboutModel(data);
      await newEntry.save();
      return NextResponse.json({ message: "Created new entry" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST /main-section:", error);
    return NextResponse.json(
      { error: "Failed to save content", details: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const data = await AboutModel.findOne(); // Consider sorting or selecting the latest if needed
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET /main-section:", error);
    return NextResponse.json(
      { error: "Failed to fetch content", details: (error as Error).message },
      { status: 500 }
    );
  }
};
