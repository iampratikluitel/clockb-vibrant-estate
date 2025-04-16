import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Footer");
  try {
    await connectDb();
    const data = await Partner.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
