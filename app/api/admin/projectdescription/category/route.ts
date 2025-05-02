import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Get all ProjectCategory Categories");
  const user = await currentUser();

  try {
    await connectDb();
    if (!user) {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }

    const docs = await ProjectCategory.find({ status: true });

    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
