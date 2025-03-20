// /app/api/main-section/route.ts
import { connectDb } from "@/lib/mongodb";
import Main from "@/model/about/main";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = await request.json();

    const newMain = new Main(body);
    await newMain.save();

    return NextResponse.json(
      { success: true, data: newMain },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Contact", error);
    return NextResponse.json(
      { error: "Failed to create content", details: (error as Error).message },
      { status: 500 }
    );
  }
}
