import { NextResponse } from "next/server";
import Contact from "@/model/contact";
import { connectDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = await request.json();
    console.log("Request Body:", body);

    const newContact = new Contact(body);
    await newContact.save();
    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Contact:", error);
    return NextResponse.json(
      { error: "Failed to create Contact", details: (error as Error).message },
      { status: 500 }
    );
  }
}
