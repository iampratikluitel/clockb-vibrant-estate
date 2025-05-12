import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import AboutModel from "@/model/about/aboutMain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();
  try {
    const data = await request.json();
    await connectDb();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    if (data._id) {
      const existingConfig = await AboutModel.findById(data._id);
      
      if (!existingConfig) {
        return NextResponse.json(
          { error: "abaut page configuration not found" },
          { status: 404 }
        );
      }
      
      await existingConfig.updateOne(data);
      return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } else {
      const newConfig = new AboutModel(data);
      await newConfig.save();
      return NextResponse.json({ message: "Created successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error updating abaut page:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const data = await AboutModel.findOne();
    
    if (!data) {
      return NextResponse.json(
        { error: "No abaut page data found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching abaut page data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};