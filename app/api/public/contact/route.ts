import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import Contact from "@/model/contact";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Public Contact");
  try {
    const data = await request.json();
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    await connectDb();
    const existingDoc = await Contact.findOne({ _id: data._id });
    if (existingDoc) {
      await existingDoc.updateOne(data);
      return NextResponse.json(
        { message: "Contact Updated", updatedContact: existingDoc },
        { status: 200 }
      );
    }

    const newDoc = new Contact({ ...data });
    await newDoc.save();

    return NextResponse.json(
      { message: "Thank You. We have received your Contact !!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Invalid request body or server error" },
      { status: 500 }
    );
  }
};
