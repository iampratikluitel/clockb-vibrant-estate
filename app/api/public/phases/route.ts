import { connectDb } from "@/lib/mongodb";
import DevelopmentPhase from "@/model/developmentphase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("Running GET request: Get development phase data");
    await connectDb();
    
    const data = await DevelopmentPhase.findOne();
    
    if (!data) {
      console.log("No development phase data found");
      return NextResponse.json(
        { error: "No development phase data found" },
        { status: 404 }
      );
    }
    
    console.log("development phase data retrieved successfully");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching development phase data:", error);
    return NextResponse.json(
      { error: "Failed to fetch development phase data" },
      { status: 500 }
    );
  }
}