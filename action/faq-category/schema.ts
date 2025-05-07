import { z } from "zod";

export const FaqCatSchema = z.object({
  name: z.string().min(1, "Name is required"),
  revalidatePath: z.string(),
});
