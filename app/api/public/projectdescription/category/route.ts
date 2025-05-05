
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get Projects Category");

  try {
    await connectDb();

    const categories = await ProjectCategory.find({ status: true });

    // Map through categories to get Project counts for each category
    const categoriesWithProjectCount = await Promise.all(
      categories.map(async (category) => {
        const ProjectCount = await ProjectCategory.countDocuments({
          categoryId: category._id, status:true,
        });
        return {
          ...category._doc,
          ProjectsCount: ProjectCount,
        };
      })
    );

    return NextResponse.json(categoriesWithProjectCount, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
