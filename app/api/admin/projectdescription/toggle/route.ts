import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import UpcommingProject from "@/model/project-description/project-description";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Toggle Blog by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
      const exisitingDoc = await UpcommingProject.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json({ message: "No Upcomming Project Found" }, { status: 404 });
      }

      // Toggle status
      exisitingDoc.status = !exisitingDoc.status;
      await exisitingDoc.save();

      return NextResponse.json({ message: "Project Toggled" }, { status: 201 });
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
