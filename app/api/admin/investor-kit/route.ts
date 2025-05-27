import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import InvestorKit from "@/model/investor-kit";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const investorkit = await InvestorKit.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(investorkit || null);
  } catch (error) {
    console.error("Error fetching investor kit:", error);
    return NextResponse.json(
      { error: "Failed to fetch investor kit" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await currentUser();
  console.log("Current user:", user);

  try {
    await connectDb();

    const data = await request.json();

    if (user) {
      if (data?._id) {
        const existingConfig = await InvestorKit.findById(data._id);
        if (existingConfig) {
          if (
            existingConfig.fileUrl &&
            existingConfig.fileUrl !== data.fileUrl
          ) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.fileUrl);
          }

          const updated = await InvestorKit.findByIdAndUpdate(data._id, data, {
            new: true,
          });

          console.log("Updated investor kit:", updated);
          return NextResponse.json(updated, { status: 200 });
        }
      }

      const newinvestorkit = await new InvestorKit(data).save();
      return NextResponse.json(newinvestorkit, { status: 200 });
    }

    console.warn("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
