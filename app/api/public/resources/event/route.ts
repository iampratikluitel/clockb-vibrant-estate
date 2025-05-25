import { connectDb } from "@/lib/mongodb";
import Event from "@/model/resources/UpcommingEvent";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const data = await Event.findOne().sort({
      updatedAt: -1,
    });
    return NextResponse.json(data || null);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
