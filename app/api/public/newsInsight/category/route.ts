
import { connectDb } from "@/lib/mongodb";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get NewsInsights Category");

  try {
    await connectDb();

    const categories = await NewsInsightCategory.find({ status: true });

    // Map through categories to get NewsInsight counts for each category
    const categoriesWithNewsInsightCount = await Promise.all(
      categories.map(async (category) => {
        const NewsInsightCount = await NewsInsightCategory.countDocuments({
          categoryId: category._id, status:true,
        });
        return {
          ...category._doc,
          NewsInsightsCount: NewsInsightCount,
        };
      })
    );

    return NextResponse.json(categoriesWithNewsInsightCount, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
