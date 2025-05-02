import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import PrivacyPolicy from "@/model/configuration/PrivacyPolicy";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Privacy Policy Config");
  const user = await currentUser();

  try {
    const data = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingConfig = await PrivacyPolicy.findOne({ _id: data?._id });
      if (existingConfig) {
        await existingConfig.updateOne(data);
        return NextResponse.json({ message: "Updated" }, { status: 201 });
      } else {
        const newData = new PrivacyPolicy({ ...data });
        await newData.save();
        return NextResponse.json({ message: "Added" }, { status: 201 });
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
  console.log("Running GET request: Get Privacy Policy");
  try {
    await connectDb();
    const data = await PrivacyPolicy.findOne();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
