import { connectDb } from "@/lib/mongodb";
import InvestmentDocument from "@/model/resources/InvestmentDocument";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const data = await InvestmentDocument.findOne().sort({
      updatedAt: -1,
    });
    return NextResponse.json(data || null);
  } catch (error) {
    console.error("Error fetching investment document:", error);
    return NextResponse.json(
      { error: "Failed to fetch investment document" },
      { status: 500 }
    );
  }
}
