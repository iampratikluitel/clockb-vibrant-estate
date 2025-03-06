import { NextResponse } from "next/server";
import Appointment from "@/app/model/appoinment";
import { connectDb } from "@/lib/mongodb"

export async function POST(request: Request) {
    try {
      await connectDb();
      const body = await request.json();
      console.log("Request Body:", body);  
  
      const newAppointment = new Appointment(body);
      await newAppointment.save();
      return NextResponse.json({ success: true, data: newAppointment }, { status: 201 });
    } catch (error) {
      console.error("Error creating appointment:", error);
      return NextResponse.json({ error: "Failed to create appointment", details: (error as Error).message }, { status: 500 });
    }
  }
  



