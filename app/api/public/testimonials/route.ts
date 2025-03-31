import { connectDb } from "@/lib/mongodb";
import Testimonials from "@/model/testimonial/testimonial";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get all Testimonials");

  try {
    await connectDb();
    const docs = await Testimonials.find().sort({
      postedDate: -1,
    });
    return NextResponse.json(docs, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
