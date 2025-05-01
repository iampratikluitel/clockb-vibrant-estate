import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, {message: "Description is requires"}),
  author: z.string().min(1, {message: "Author is required"}),
  image: z.any(),
  bannerImage: z.any(),
  overview: z.string().min(1, { message: "Overview is required." }),
  categoryId: z.string().min(2, {
    message: "CategoryId is required.",
  }),
});
