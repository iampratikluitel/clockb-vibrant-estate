import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import { FAQs } from "@/model/FAQs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Toggle Faq by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
      const exisitingDoc = await FAQs.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Faq Found" },
          { status: 404 }
        );
      }
      exisitingDoc.status = !exisitingDoc.status;
      await exisitingDoc.save();

      const message = exisitingDoc.status
        ? "Faq set to Active"
        : "Faq set to Inactive";

      return NextResponse.json({ message: message }, { status: 201 });
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
