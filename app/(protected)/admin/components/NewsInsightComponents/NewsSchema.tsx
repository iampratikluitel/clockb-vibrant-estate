import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  image: z.any(),
  bannerImage: z.any(),
  overview: z.string().min(1, { message: "Overview is required." }),
  categoryId: z.string().min(2, {
    message: "CategoryId is required.",
  }),
  addedDate: z.string().min(2, {
    message: "Training Date must be at least 2 characters.",
  }),
});
