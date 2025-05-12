import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    await connectDb();

    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10", 10);

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
