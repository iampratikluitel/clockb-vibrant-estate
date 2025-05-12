import { connectDb } from "@/lib/mongodb";
import { FAQs,FAQsCategory } from "@/model/FAQs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get all Faq");

  try {
    await connectDb();

    const Faqs = await FAQs.find({ status: true }).sort({
      addedDate: -1,
    });

    const categoryIds = Faqs.map((Faq) => Faq.categoryId);
    const categories = await FAQsCategory.find({
      _id: { $in: categoryIds },
    });
    const categoryMap = categories.reduce((acc, category) => {
      acc[category._id] = category.name;
      return acc;
    }, {});

    const FaqsWithCategoryNames = Faqs.map((Faq) => ({
      ...Faq.toObject(),
      category: categoryMap[Faq.categoryId] || "",
    }));

    return NextResponse.json(FaqsWithCategoryNames, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
