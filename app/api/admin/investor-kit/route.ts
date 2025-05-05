import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import InvestorKit from "@/model/investor-kit";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const investorKit = await InvestorKit.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(investorKit || null);
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

  try {
    await connectDb();
    const data = await request.json();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await InvestorKit.findById(data._id);
        if (existingConfig) {
          if (existingConfig.fileUrl && existingConfig.fileUrl !== data.fileUrl) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.fileUrl);
          }
          await InvestorKit.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new InvestorKit(data).save();
        }
      } else {
        await new InvestorKit(data).save();
      }
      return NextResponse.json({ message: responseMessage }, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 