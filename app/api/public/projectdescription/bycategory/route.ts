
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get NewsInsights By Category");
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await connectDb();

    const foundCategory = await ProjectCategory.findOne({ slug });

    if (foundCategory) {
      const Projects = await UpcommingProject.find({
        categoryId: foundCategory._id,
        status: true,
      }).sort({
        addedDate: -1,
      });
      // Retrieve categories and map them by their IDs
      const categoryIds = Projects.map((Project) => Project.categoryId);
      const categories = await ProjectCategory.find({
        _id: { $in: categoryIds },
      });
      const categoryMap = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

      // Add category name to each blog
      const ProjectsWithCategoryNames = Projects.map((Project) => ({
        ...Project.toObject(),
        category: categoryMap[Project.categoryId] || "",
      }));

      return NextResponse.json(ProjectsWithCategoryNames, { status: 200 });
    }else{
      return NextResponse.json("No Projects Found", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
