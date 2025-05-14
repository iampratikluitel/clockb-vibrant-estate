import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import NewsLetter from "@/model/Newsletter";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple NewsLetter by id");
  const user = await currentUser();

  try {
    await connectDb();
    const { ids } = await request.json();
    if (user) {
      const ToDelete = await NewsLetter.find({
        _id: { $in: ids },
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json({ message: "No NewsLetter Found" }, { status: 404 });
      }
      await NewsLetter.deleteMany({
        _id: { $in: ids },
      });
      return NextResponse.json({ message: "NewsLetter Deleted" }, { status: 201 });
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
