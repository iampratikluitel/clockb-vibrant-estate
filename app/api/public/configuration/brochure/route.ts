import { connectDb } from "@/lib/mongodb";
import Brochure from "@/model/configuration/brochureConfiguration";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Brochure");

  try {
    await connectDb();
    const data = await Brochure.findOne(); 

    if (!data) {
      return NextResponse.json({ error: "Brochure not found" }, { status: 404 });
    }
    return NextResponse.json({ brochureUrl: data.brochure }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
