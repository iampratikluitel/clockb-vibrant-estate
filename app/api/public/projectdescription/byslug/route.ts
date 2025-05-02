import { connectDb } from "@/lib/mongodb";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get upcommingprojects by slug");
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await connectDb();
    const doc = await UpcommingProject.findOne({ slug });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
