import { connectDb } from "@/lib/mongodb";
import ProjectJourney from "@/model/configuration/projectjourner";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("Running GET request: Get Project Journey data");
    await connectDb();
    
    const data = await ProjectJourney.findOne();
    
    if (!data) {
      console.log("No project journey data found");
      return NextResponse.json(
        { error: "No project journey data found" },
        { status: 404 }
      );
    }
    
    console.log("Project journey data retrieved successfully");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching project journey data:", error);
    return NextResponse.json(
      { error: "Failed to fetch project journey data" },
      { status: 500 }
    );
  }
}