import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import ProjectJourney from "@/model/configuration/projectjourner";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await currentUser();
  try {
    const data = await request.json();
    await connectDb();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    // Check if we're updating an existing document
    if (data._id) {
      const existingConfig = await ProjectJourney.findById(data._id);
      
      if (!existingConfig) {
        return NextResponse.json(
          { error: "Project journey configuration not found" },
          { status: 404 }
        );
      }
      
      // Update the document
      await existingConfig.updateOne(data);
      return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } else {
      // Create new document
      const newConfig = new ProjectJourney(data);
      await newConfig.save();
      return NextResponse.json({ message: "Created successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error updating project journey:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const data = await ProjectJourney.findOne();
    
    if (!data) {
      return NextResponse.json(
        { error: "No project journey data found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching project journey data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};