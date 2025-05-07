import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import DevelopmentPhase from "@/model/developmentphase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();
  try {
    const data = await request.json();
    await connectDb();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (data._id) {
      const existingConfig = await DevelopmentPhase.findById(data._id);

      if (!existingConfig) {
        return NextResponse.json(
          { error: "development phase configuration not found" },
          { status: 404 }
        );
      }

      await existingConfig.updateOne(data);
      return NextResponse.json(
        { message: "Updated successfully" },
        { status: 200 }
      );
    } else {
      const newConfig = new DevelopmentPhase(data);
      await newConfig.save();
      return NextResponse.json(
        { message: "Created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error updating development phase:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const data = await DevelopmentPhase.findOne();

    if (!data) {
      return NextResponse.json(
        { error: "No development phase data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching development phase data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};
