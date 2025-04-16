import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import InvestorMainModel from "@/model/investor-relation/investor-main";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();

  try {
    const data = await request.json();
    await connectDb();
    if (user) {
      const newInvestorWork = new InvestorMainModel(data);
      await newInvestorWork.save();

      return NextResponse.json(
        { success: true, data: newInvestorWork },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error creating Contact", error);
    return NextResponse.json(
      { error: "Failed to create content", details: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Brochure");
  try {
    await connectDb();
    const data = await InvestorMainModel.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
