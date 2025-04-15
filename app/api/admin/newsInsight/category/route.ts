import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Get all NewsInsight Categories");
  const user = await currentUser();

  try {
    await connectDb();
    if (!user) {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }

    const docs = await NewsInsightCategory.find({ status: true });

    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
