import { connectDb } from "@/lib/mongodb";
import Appointment from "@/model/appoinment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Public Get all appointment");

  try {
    await connectDb();
    const appointment = await Appointment.find().sort({
      addedDate: 1,
    });
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};