import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDb();

    // Extract pagination info from query parameters (if any)
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10", 10);

    // Fetch data with pagination and sorting
    const data = await TeamMember.find()
      .skip((page - 1) * limit) 
      .limit(limit) 
      .sort({ postedDate: -1 }); 

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
};
