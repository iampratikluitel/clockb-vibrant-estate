import { connectDb } from "@/lib/mongodb";
import Contact from "@/model/contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Footer");
  try {
    await connectDb();
    console.log("Contact page mongodb connected");
    const data = await Contact.findOne();
    
    if (!data) {
      return NextResponse.json(
        { error: "No contact data found" },
        { status: 404 } // Use 404 if no data is found
      );
    }
    
    return NextResponse.json(data, { status: 200 }); // Use 200 OK for GET requests
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 } // Use 500 for server errors
    );
  }
};
