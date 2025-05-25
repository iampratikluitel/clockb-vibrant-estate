import { connectDb } from "@/lib/mongodb";
import Guide from "@/model/resources/Guide";
import InvestmentDocument from "@/model/resources/InvestmentDocument";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const data = await Guide.findOne().sort({
      updatedAt: -1,
    });
    return NextResponse.json(data || null);
  } catch (error) {
    console.error("Error fetching Guide:", error);
    return NextResponse.json(
      { error: "Failed to fetch Guide" },
      { status: 500 }
    );
  }
}
