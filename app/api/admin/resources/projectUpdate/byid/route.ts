import { connectDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Report from "@/model/resources/ProjectUpdates";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get Report by id");
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectDb();
    const doc = await Report.findOne({ _id });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};