import { connectDb } from "@/lib/mongodb";
import FAQs from "@/model/FAQs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest)=>{
    console.log("Running GET request: Get FAQs by id");
    const { searchParams } = new URL(request.url);
      const _id = searchParams.get("faqId");

    try {
        await connectDb();
        const faqs = await FAQs.findOne({_id});
        return  NextResponse.json(faqs, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Invalidf request body" }, { status: 400 });
    }


}