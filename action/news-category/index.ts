"use server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { convertToSlug } from "@/lib/helper";
import { connectDb } from "@/lib/mongodb";
import minioClient from "@/lib/minioClient";
import { BUCKET_NAME } from "@/lib/constants";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { NewsCatSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  await connectDb();

  const nameLowerCase = data.name.toLowerCase();
  let existingCategoryCheck = await NewsInsightCategory.findOne({
    name: { $regex: new RegExp(`^${nameLowerCase}$`, "i") },
  });

  if (existingCategoryCheck) {
    if (existingCategoryCheck.status) {
      return { error: "Category with the same name already exists" };
    } else {
      let slug = convertToSlug(data.name);
      let existingSlugCheck = await NewsInsightCategory.findOne({ slug });

      let counter = 1;
      while (existingSlugCheck) {
        slug = convertToSlug(data.name + ` ${counter}`);
        existingSlugCheck = await NewsInsightCategory.findOne({ slug });
        counter++;
      }
      await minioClient.removeObject(BUCKET_NAME, existingCategoryCheck.icon);
      const { revalidatePath: URL, name} = data;
      existingCategoryCheck.name = name;
      existingCategoryCheck.status = true;
      await existingCategoryCheck.save();

      // Convert to plain object and manually convert _id to string
      const plainNewCategory = existingCategoryCheck.toObject();
      plainNewCategory._id = plainNewCategory._id.toString();
      revalidatePath(URL);
      return { data: plainNewCategory };
    }
  }

  let slug = convertToSlug(data.name);
  let existingSlugCheck = await NewsInsightCategory.findOne({ slug });

  let counter = 1;
  while (existingSlugCheck) {
    slug = convertToSlug(data.name + ` ${counter}`);
    existingSlugCheck = await NewsInsightCategory.findOne({ slug });
    counter++;
  }

  const { revalidatePath: URL, name } = data;

  const newCategory = new NewsInsightCategory({
    name,
    slug: slug,
  });
  await newCategory.save();

  // Convert to plain object and manually convert _id to string
  const plainNewCategory = newCategory.toObject();
  plainNewCategory._id = plainNewCategory._id.toString();
  revalidatePath(URL);
  return { data: plainNewCategory };
};

export const deleteNewsCategory = async (_id: string, url: string) => {
  try {
    await connectDb();
    const existingCategory = await NewsInsightCategory.findOne({ _id });
    if (existingCategory) {
      existingCategory.status = false;
      await existingCategory.save();
    }
    revalidatePath(url);
    if (existingCategory) {
      return { message: "Deleted" };
    } else {
      return { error: "Could not delete category" };
    }
  } catch (error) {
    return { error: "Could not delete category" };
  }
};

export const createNewsCategory = createSafeAction(NewsCatSchema, handler);
