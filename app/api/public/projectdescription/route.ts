import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("Running GET request: Get all Project");

  try {
    await connectDb();

    const Projects = await UpcommingProject.find({ status: true }).sort({
      addedDate: -1,
    });

    const categoryIds = Projects.map((Project) => Project.categoryId);
    const categories = await ProjectCategory.find({
      _id: { $in: categoryIds },
    });
    const categoryMap = categories.reduce((acc, category) => {
      acc[category._id] = category.name;
      return acc;
    }, {});

    const ProjectsWithCategoryNames = Projects.map((Project) => ({
      ...Project.toObject(),
      category: categoryMap[Project.categoryId] || "",
    }));

    return NextResponse.json(ProjectsWithCategoryNames, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
