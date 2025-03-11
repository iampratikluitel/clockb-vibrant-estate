import { connectDb } from "@/lib/mongodb";
import FAQs from "@/model/FAQs";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const faqs = await FAQs.find();
    console.log("Request Body:", faqs);
    return NextResponse.json(faqs, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { question, answer } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { message: "Question and Answer are required." },
        { status: 400 }
      );
    }

    const newFaq = new FAQs({
      question,
      answer,
      addedDate: new Date(),
    });
    await newFaq.save();
    return NextResponse.json(
      { message: "FAQ added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 }
    );
  }
}
