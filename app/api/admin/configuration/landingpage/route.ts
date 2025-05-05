import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import ProjectJourney from "@/model/configuration/projectjourner";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();
  try {
    const data = await request.json();
    await connectDb();
    if (user) {
      const existingConfig = await ProjectJourney.findOne({ _id: data?._id });
      await existingConfig.updateOne(data);
      return NextResponse.json({ message: "Updated" }, { status: 201 });
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

export const GET = async () => {
  try {
    await connectDb();
    const data = await ProjectJourney.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
