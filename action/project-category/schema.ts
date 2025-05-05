import { z } from "zod";

export const ProjectCatSchema = z.object({
  name: z.string().min(1, "Name is required"),
  revalidatePath: z.string(),
});
