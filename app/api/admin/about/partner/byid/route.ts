import { connectDb } from "@/lib/mongodb";
import Partner from "@/model/about/partner";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest)=>{
    console.log("Running GET request: Get Testimonial by id");
    const { searchParams } = new URL(request.url);
      const _id = searchParams.get("id");

    try {
        await connectDb
        const doc = await Partner.findOne({_id});
        return  NextResponse.json(doc, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }


}