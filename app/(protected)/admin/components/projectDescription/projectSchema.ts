import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 word" }),
  description: z
    .string()
    .min(2, { message: "Title should be at least 2 word" }),
  image: z.any(),
  addedDate: z.date().optional(),
  overview: z.string().min(10, {
    message: "Overview must be at least 10 characters.",
  }),
});
