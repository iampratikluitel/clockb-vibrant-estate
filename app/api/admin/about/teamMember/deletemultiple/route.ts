import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple TeamMembers by id");
  const user = await currentUser();

  try {
    await connectDb();
    const { ids } = await request.json();
    if (user) {
      const ToDelete = await TeamMember.find({
        _id: { $in: ids },
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json(
          { message: "No TeamMembers Found" },
          { status: 404 }
        );
      }
      await TeamMember.deleteMany({
        _id: { $in: ids },
      });

      for (const element of ToDelete) {
        if (element.image != null) {
          await minioClient.removeObject(BUCKET_NAME, element.image);
        }
      }

      return NextResponse.json({ message: "TeamMembers Deleted" }, { status: 201 });
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
