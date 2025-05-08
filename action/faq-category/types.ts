import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { FAQCATEGORY  } from "@/lib/types";
import { FaqCatSchema } from "./schema";

export type InputType = z.infer<typeof FaqCatSchema>;
export type ReturnType = ActionState<InputType, FAQCATEGORY>;
