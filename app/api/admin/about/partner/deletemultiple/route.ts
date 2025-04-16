import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Multiple Partners by id");
  const user = await currentUser();

  try {
    await connectDb();
    const { ids } = await request.json();
    if (user) {
      const ToDelete = await Partner.find({
        _id: { $in: ids },
      });

      if (!ToDelete || ToDelete.length === 0) {
        return NextResponse.json(
          { message: "No Partners Found" },
          { status: 404 }
        );
      }
      await Partner.deleteMany({
        _id: { $in: ids },
      });

      for (const element of ToDelete) {
        if (element.image != null) {
          await minioClient.removeObject(BUCKET_NAME, element.image);
        }
      }

      return NextResponse.json({ message: "Partners Deleted" }, { status: 201 });
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
