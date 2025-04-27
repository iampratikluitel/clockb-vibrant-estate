import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/NewsInsights/News";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple NewsInsight by id");
  const user = await currentUser();

  try {
    await connectDb();
    const { ids } = await request.json();
    if (user) {
      const ToDelete = await NewsInsight.find({
        _id: { $in: ids },
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json({ message: "No NewsInsight Found" }, { status: 404 });
      }
      await NewsInsight.deleteMany({
        _id: { $in: ids },
      });
      return NextResponse.json({ message: "NewsInsight Deleted" }, { status: 201 });
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
