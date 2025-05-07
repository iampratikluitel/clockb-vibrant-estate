import { connectDb } from "@/lib/mongodb";
import NewsLetter from "@/model/Newsletter";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Public Subscribe Newsletter");

  try {
    const data = await request.json();
    await connectDb();

    const existing = await NewsLetter.findOne({
      email: data.email.toLowerCase(),
    });
    if (existing) {
      return NextResponse.json(
        { message: "You have already Subscribed !!" },
        { status: 201 }
      );
    } else {
      const newDoc = new NewsLetter({ email: data.email.toLowerCase() });
      await newDoc.save();
      return NextResponse.json(
        { message: "Successfully Subscribed !!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
