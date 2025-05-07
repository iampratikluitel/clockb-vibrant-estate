
import { connectDb } from "@/lib/mongodb";
import { FAQsCategory } from "@/model/FAQs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Faq Category");

  try {
    await connectDb();

    const categories = await FAQsCategory.find({ status: true });

    const categoriesWithFaqsCount = await Promise.all(
      categories.map(async (category) => {
        const FaqCount = await FAQsCategory.countDocuments({
          categoryId: category._id, status:true,
        });
        return {
          ...category._doc,
          FaqsCount: FaqCount,
        };
      })
    );

    return NextResponse.json(categoriesWithFaqsCount, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
