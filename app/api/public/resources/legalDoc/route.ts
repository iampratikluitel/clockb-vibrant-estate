import { connectDb } from "@/lib/mongodb";
import LegalDoc from "@/model/resources/LegalDocument";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running PUBLIC GET request: Get Legal document");
  try {
    await connectDb();
    const data = await LegalDoc.findOne()
    
    if (!data) {
      return NextResponse.json({ 
        message: "No about data found" 
      }, { status: 404 });
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching legal Document:", error);
    return NextResponse.json(
      { error: "Failed to fetch Legal Document" },
      { status: 500 }
    );
  }
}