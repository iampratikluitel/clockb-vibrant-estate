import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import NewsLetter from "@/model/Newsletter";
import { NextResponse } from "next/server";


export const GET = async () => {
  console.log("Running GET request: Admin Get all NewsLetter");
  const user = await currentUser();

  try {
    await connectDb();
    if (user) {
      const docs = await NewsLetter.find().sort({
        subscribedDate: -1,
      });
      return NextResponse.json(docs, { status: 201 });
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
