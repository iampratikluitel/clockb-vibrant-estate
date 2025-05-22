import { connectDb } from "@/lib/mongodb";
import Brochure from "@/model/configuration/brochureConfiguration";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const brochure = await Brochure.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(brochure || null);
  } catch (error) {
    console.error("Error fetching investor kit:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor kit" },
      { status: 500 }
    );
  }
}
