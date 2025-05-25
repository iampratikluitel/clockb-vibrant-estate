import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import InvestmentDocument from "@/model/resources/InvestmentDocument";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Investment Document");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();

    if (user) {
      const existingDoc = await InvestmentDocument.findOne({ _id: Data?._id });
      if (existingDoc) {
        if (existingDoc.fileUrl && existingDoc.fileUrl != Data.fileUrl) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.fileUrl);
        }
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "Investment Document Updated" }, { status: 201 });
      } else {
        const newDoc = new InvestmentDocument({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Investment Document Added" },
          { status: 201 }
        );
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
  console.log("Running GET request: Get all Investment Document");

  try {
    await connectDb();
    const docs = await InvestmentDocument.find().sort({
      postedDate: -1,
    });
    return NextResponse.json(docs, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Investment Document by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
    const exisitingDoc = await InvestmentDocument.findOne({ _id });
    if (!exisitingDoc) {
    return NextResponse.json({ message: "No Investment Document Found" }, { status: 404 });
    }

    await InvestmentDocument.deleteOne({ _id });
    if (exisitingDoc.logo != null) {
      await minioClient.removeObject(
        BUCKET_NAME,
        exisitingDoc.logo
      );
    }
    return NextResponse.json({ message: "Investment Document Deleted" }, { status: 201 });

    }else{
      return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
    }
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
  }
}