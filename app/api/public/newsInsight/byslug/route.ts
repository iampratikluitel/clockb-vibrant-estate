import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/NewsInsights/News";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get NewsInsight by slug");
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await connectDb();
    const doc = await NewsInsight.findOne({ slug });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
