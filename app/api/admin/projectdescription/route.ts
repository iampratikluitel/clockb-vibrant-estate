import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import { convertToSlug } from "@/lib/helper";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST for the projectDescription");
  const user = await currentUser();

  try {
    const data = await request.json();
    await connectDb();

    if (user) {
      const existingDoc = await UpcommingProject.findOne({ _id: data?._id });

      if (existingDoc) {
        const slug = convertToSlug(data.title);
        if (slug !== existingDoc.slug) {
          data.slug = slug;
          const existingSlug = await UpcommingProject.findOne({ slug });
          if (existingSlug) {
            let uniqueSlug = slug;
            let counter = 1;
            while (await UpcommingProject.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug} - ${counter}`;
              counter++;
            }
            data.slug = uniqueSlug;
          }
          if (existingDoc.image && existingDoc.image == !data.image) {
            await minioClient.removeObject(BUCKET_NAME, existingDoc.image);
          }

          await existingDoc.updateOne(data);
          return NextResponse.json(
            { message: "Project Updated" },
            { status: 201 }
          );
        }
      } else {
        if (!data.slug) {
          const slug = convertToSlug(data.title);
          data.slug = slug;
          const existingSlug = await UpcommingProject.findOne({ slug });
          if (existingSlug) {
            let uniqueSlug = slug;
            let counter = 1;
            while (await UpcommingProject.findOne({ slug: uniqueSlug })) {
              uniqueSlug = `${slug} -${counter}`;
              counter++;
            }
            data.slug = uniqueSlug;
          }
        }
        const newDoc = new UpcommingProject({ ...data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Project Added" },
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

    const Projects = await UpcommingProject.find().sort({
      addedDate: -1,
    });

    const categoryIds = Projects.map((Project) => Project.categoryId);
    const categories = await ProjectCategory.find({ _id: { $in: categoryIds } });
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

export const DELETE = async (request: NextRequest) => {
  console.log("Running DELETE request: Admin DELETE Offer by id");
  const user = await currentUser();
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (user) {
      const exisitingDoc = await UpcommingProject.findOne({ _id });
      if (!exisitingDoc) {
        return NextResponse.json(
          { message: "No Offer Found" },
          { status: 404 }
        );
      }

      await UpcommingProject.deleteOne({ _id });
      if (exisitingDoc.image != null) {
        await minioClient.removeObject(BUCKET_NAME, exisitingDoc.image);
      }
      return NextResponse.json({ message: "Offer Deleted" }, { status: 201 });
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
