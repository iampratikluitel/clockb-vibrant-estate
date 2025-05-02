import { connectDb } from "@/lib/mongodb";
import ConditionsOfUse from "@/model/configuration/ConditionsOfUse";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Conditions Of Use");
  try {
    await connectDb();
    const data = await ConditionsOfUse.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
