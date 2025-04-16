import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 word" }),
  description: z
    .string()
    .min(2, { message: "Title should be at least 2 word" }),
  image: z.any(),
  bannerImage: z.any(),
  categoryId: z.string().min(2, { message: "CategoryId is required" }),
  addedDate: z.date().optional(),
  overview: z.string().min(10, {
    message: "Overview must be at least 10 characters.",
  }),
});
