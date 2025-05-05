import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import InvestorKit from "@/model/configuration/investorKitConfiguration";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Investor Kit");

  const user = await currentUser();
  console.log("user", user);
  try {
    const data = await request.json();
    await connectDb();

    let responseMessage = "Added";
    if (user) {
      if (data?._id) {
        const existingConfig = await InvestorKit.findById(data._id);
        if (existingConfig) {
          // Check if the file is changed and delete old file
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
    }

    return NextResponse.json({ message: responseMessage }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const investorKit = await InvestorKit.findOne().sort({ updatedAt: -1 });
    return NextResponse.json(investorKit);
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}; 