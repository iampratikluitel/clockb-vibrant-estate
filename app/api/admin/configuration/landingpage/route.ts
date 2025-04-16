import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import ProjectJourney from "@/model/configuration/projectjourner";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Run POST for the project-journey")
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    await connectDb();
    if (user) {
      const newProjectJourney = new ProjectJourney(data);
      await newProjectJourney.save();

      return NextResponse.json(
        { success: true, data: newProjectJourney },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error creating Contact", error);
    return NextResponse.json(
      { error: "Failed to create content", details: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Brochure");
  try {
    await connectDb();
    const data = await ProjectJourney.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
