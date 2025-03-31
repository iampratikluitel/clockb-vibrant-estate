import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import FAQs from "@/model/FAQs";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update FAQs");
  const user = await currentUser();

  try {
    const faqData = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingFAQ = await FAQs.findOne({ _id: faqData?._id });
      if (existingFAQ) {
        await existingFAQ.updateOne(faqData);
        return NextResponse.json({ message: "FAQ Updated" }, { status: 201 });
      } else {
        const newFAQ = new FAQs({ ...faqData });
        await newFAQ.save();
        console.log("New FAQ Added");
        return NextResponse.json({ message: "New FAQ Added" }, { status: 201 });
      }
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get all FAQs");

  try {
    await connectDb();
    const allFAQs = await FAQs.find().sort({
      addedDate: -1,
    });
    return NextResponse.json(allFAQs, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE FAQ by id");
  const user = await currentUser();

  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("faqId");

    if (user) {
      const exisitingFAQ = await FAQs.findOne({ _id });
      if (!exisitingFAQ) {
        return NextResponse.json({ message: "No FAQ Found" }, { status: 404 });
      }

      await FAQs.deleteOne({ _id });
      console.log("FAQ Deleted");
      return NextResponse.json({ message: "FAQ Deleted" }, { status: 201 });
    } else {
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
