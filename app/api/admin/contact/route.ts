import { connectDb } from "@/lib/mongodb";
import Contact from "@/model/contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Public Get all contact");

  try {
    await connectDb();
    const contact = await Contact.find().sort({
      addedDate: 1,
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};