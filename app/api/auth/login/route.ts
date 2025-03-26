import { NextResponse } from "next/server";
import User from "@/model/appoinment";
import { connectDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = await request.json();
    console.log("Request Body:", body);

    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating User:", error);
    return NextResponse.json(
      { error: "Failed to create User", details: (error as Error).message },
      { status: 500 }
    );
  }
}
