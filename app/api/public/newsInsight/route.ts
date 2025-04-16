import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/NewsInsights/News";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get all NewsInsights");

  try {
    await connectDb();

    const NewsInsights = await NewsInsight.find({ status: true }).sort({
      addedDate: -1,
    });

    const categoryIds = NewsInsights.map((NewsInsight) => NewsInsight.categoryId);
    const categories = await NewsInsightCategory.find({
      _id: { $in: categoryIds },
    });
    const categoryMap = categories.reduce((acc, category) => {
      acc[category._id] = category.name;
      return acc;
    }, {});

    const NewsInsightsWithCategoryNames = NewsInsights.map((NewsInsight) => ({
      ...NewsInsight.toObject(),
      category: categoryMap[NewsInsight.categoryId] || "",
    }));

    return NextResponse.json(NewsInsightsWithCategoryNames, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
