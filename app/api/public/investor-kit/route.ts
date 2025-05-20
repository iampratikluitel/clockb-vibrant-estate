import { connectDb } from "@/lib/mongodb";
import InvestorKit from "@/model/investor-kit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const investorKit = await InvestorKit.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(investorKit || null);
  } catch (error) {
    console.error("Error fetching investor kit:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor kit" },
      { status: 500 }
    );
  }
}