import { connectDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import LegalDoc from "@/model/resources/LegalDocument";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get Legal Document by id");
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  try {
    await connectDb();
    const doc = await LegalDoc.findOne({ _id });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};