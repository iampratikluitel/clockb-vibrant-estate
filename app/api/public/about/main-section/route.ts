import { connectDb } from "@/lib/mongodb";
import AboutModel from "@/model/about/aboutMain";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running PUBLIC GET request: Get About Data");
  try {
    await connectDb();
    // Get the latest entry for public display
    const data = await AboutModel.findOne()
    
    if (!data) {
      return NextResponse.json({ 
        message: "No about data found" 
      }, { status: 404 });
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about page data" },
      { status: 500 }
    );
  }
}