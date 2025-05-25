import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import Event from "@/model/resources/UpcommingEvent";
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
      const existingConfig = await Event.findById(data._id);
      
      if (!existingConfig) {
        return NextResponse.json(
          { error: "abaut page configuration not found" },
          { status: 404 }
        );
      }
      
      await existingConfig.updateOne(data);
      return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } else {
      const newConfig = new Event(data);
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
    const data = await Event.findOne();
    
    if (!data) {
      return NextResponse.json(
        { error: "No abaut page data found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data, { status: 200 });  } catch (error) {
    console.error("Error fetching abaut page data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Delete Event");
  const user = await currentUser();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDb();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existingEvent = await Event.findOne({ _id: id });
    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await existingEvent.deleteOne();
    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
};

