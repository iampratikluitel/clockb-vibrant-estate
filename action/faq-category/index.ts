"use server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { FAQsCategory } from "@/model/FAQs";
import { FaqCatSchema } from "./schema";
import { connectDb } from "@/lib/mongodb";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  await connectDb();

  const nameLowerCase = data.name.toLowerCase();
  const existingCategoryCheck = await FAQsCategory.findOne({
    name: { $regex: new RegExp(`^${nameLowerCase}$`, "i") },
  });

  const { revalidatePath: URL, name } = data;

  if (existingCategoryCheck) {
    if (existingCategoryCheck.status) {
      return { error: "Category with the same name already exists" };
    } else {
      existingCategoryCheck.name = name;
      existingCategoryCheck.status = true;
      await existingCategoryCheck.save();

      const plainNewCategory = existingCategoryCheck.toObject();
      plainNewCategory._id = plainNewCategory._id.toString();
      revalidatePath(URL);
      return { data: plainNewCategory };
    }
  }

  const newCategory = new FAQsCategory({
    name,
  });
  await newCategory.save();

  const plainNewCategory = newCategory.toObject();
  plainNewCategory._id = plainNewCategory._id.toString();
  revalidatePath(URL);
  return { data: plainNewCategory };
};

export const deleteFaqCategory = async (_id: string, url: string) => {
  try {
    await connectDb();
    const existingCategory = await FAQsCategory.findOne({ _id });
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

export const createFaqCategory = createSafeAction(FaqCatSchema, handler);
