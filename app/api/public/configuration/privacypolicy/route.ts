import { connectDb } from "@/lib/mongodb";
import PrivacyPolicy from "@/model/configuration/PrivacyPolicy";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Privacy Policy");
  try {
    await connectDb();
    const data = await PrivacyPolicy.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
