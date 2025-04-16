
import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/NewsInsights/News";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get NewsInsights By Category");
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await connectDb();

    const foundCategory = await NewsInsightCategory.findOne({ slug });

    if (foundCategory) {
      const NewsInsights = await NewsInsight.find({
        categoryId: foundCategory._id,
        status: true,
      }).sort({
        addedDate: -1,
      });
      // Retrieve categories and map them by their IDs
      const categoryIds = NewsInsights.map((NewsInsight) => NewsInsight.categoryId);
      const categories = await NewsInsightCategory.find({
        _id: { $in: categoryIds },
      });
      const categoryMap = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

      // Add category name to each blog
      const NewsInsightsWithCategoryNames = NewsInsights.map((NewsInsight) => ({
        ...NewsInsight.toObject(),
        category: categoryMap[NewsInsight.categoryId] || "",
      }));

      return NextResponse.json(NewsInsightsWithCategoryNames, { status: 200 });
    }else{
      return NextResponse.json("No NewsInsights Found", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
