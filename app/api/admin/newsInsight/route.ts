import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/news-and-insights/news";
import minioClient from "@/lib/minioClient";
import { BUCKET_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  const user = await currentUser();

  try {
    await connectDb();
    const data = await request.json();

    if (user) {
      let responseMessage = "Added";
      if (data?._id) {
        const existingConfig = await NewsInsight.findById(data._id);
        if (existingConfig) {
          if (existingConfig.image && existingConfig.image !== data.image) {
            await minioClient.removeObject(BUCKET_NAME, existingConfig.image);
          }
          await NewsInsight.findByIdAndUpdate(data._id, data, { new: true });
          responseMessage = "Updated";
        } else {
          await new NewsInsight(data).save();
        }
      } else {
        await new NewsInsight(data).save();
      }
      return NextResponse.json({ message: responseMessage }, { status: 200 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const GET = async () => {
  console.log("Running Det request: Get all news");

  try {
    await connectDb();
    const newsInsight = (await NewsInsight.find()).toSorted(
      (a, b) => b.addedDate - a.addedDate
    );
    const categoryIds = newsInsight.map((news) => news.categoryId);
    const categories = await NewsInsight.find({ _id: { $in: categoryIds } });
    const categoryMap = categories.reduce((acc, categorg) => {
      acc[categorg._id] = categorg.name;
      return acc;
    }, {});

    const newsWithCategoryNames = newsInsight.map((news) => ({
      ...news.toObject(),
      category: categoryMap[news.categoryId] || "",
    }));
    return NextResponse.json(newsWithCategoryNames, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE News by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
      const exisitingDoc = await NewsInsight.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No News Found" },
          { status: 404 }
        );
      }

      await NewsInsight.deleteOne({ _id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      if (exisitingDoc.bannerImage != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.bannerImage);
      }
      return NextResponse.json({ message: "News Deleted" }, { status: 201 });
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
