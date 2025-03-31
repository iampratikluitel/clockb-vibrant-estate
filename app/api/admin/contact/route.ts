import { connectDb } from "@/lib/mongodb";
import Contact from "@/model/contact";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Brochure");
  try {
    await connectDb();
    const data = await Contact.find();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
