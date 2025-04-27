import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import { convertToSlug } from "@/lib/helper";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import NewsInsight from "@/model/NewsInsights/News";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update NewsInsights");
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectDb();
    console.log("MongoDb Connected");

    if (user) {
      const existingDoc = await NewsInsight.findOne({ _id: Data?._id });
      if (existingDoc) {
        const slug = convertToSlug(Data.title);
        if (slug !== existingDoc.slug) {
          Data.slug = slug;
          const existingSlug = await NewsInsight.findOne({ slug });
          if (existingSlug) {
            let uniqueSlug = slug;
            let counter = 1;
            while (await NewsInsight.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug}-${counter}`;
              counter++;
            }
            Data.slug = uniqueSlug;
          }
        }

        if (existingDoc.image && existingDoc.image != Data.image) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
        }       

        if (existingDoc.bannerImage && existingDoc.bannerImage != Data.bannerImage) {
          await minioClient.removeObject(BUCKET_NAME, existingDoc.bannerImage);
        }
        
        await existingDoc.updateOne(Data);
        return NextResponse.json({ message: "NewsInsight Updated" }, { status: 201 });
      } else {
        if (!Data.slug) {
          const slug = convertToSlug(Data.title);
          Data.slug = slug;
          const existingSlug = await NewsInsight.findOne({ slug });
          if (existingSlug) {
            let uniqueSlug = slug;
            let counter = 1;
            while (await NewsInsight.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug}-${counter}`;
              counter++;
            }
            Data.slug = uniqueSlug;
          }
        }

        const newDoc = new NewsInsight({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New NewsInsight Added",data: newDoc._id },
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
  console.log("Running GET request: Get all NewsInsights");

  try {
    await connectDb();

    const NewsInsights = await NewsInsight.find().sort({
      addedDate: -1,
    });

    const categoryIds = NewsInsights.map((NewsInsight) => NewsInsight.categoryId);
    const categories = await NewsInsightCategory.find({ _id: { $in: categoryIds } });
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

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE NewsInsight by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
      const exisitingDoc = await NewsInsight.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json({ message: "No NewsInsight Found" }, { status: 404 });
      }

      await NewsInsight.deleteOne({ _id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      if (exisitingDoc.bannerImage != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.bannerImage);
      }
      return NextResponse.json({ message: "NewsInsight Deleted" }, { status: 201 });
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
