import { connectDb } from "@/lib/mongodb";
import FooterConfiguration from "@/model/configuration/footerConfiguration";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Footer Config");
  const user = await currentUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    await connectDb();
    console.log("MongoDB Connected");

    let responseMessage = "Added";
    
    if (data?._id) {
      const existingConfig = await FooterConfiguration.findById(data._id);
      if (existingConfig) {
        await FooterConfiguration.findByIdAndUpdate(data._id, data, {
          new: true,
        });
        responseMessage = "Updated";
      } else {
        await new FooterConfiguration(data).save();
      }
    } else {
      await new FooterConfiguration(data).save();
    }

    return NextResponse.json({ message: responseMessage }, { status: 200 });
  } catch (error) {
    console.error("Footer configuration error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const GET = async () => {
  console.log("Running GET request: Get Footer");
  try {
    await connectDb();
    const data = await FooterConfiguration.findOne();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};