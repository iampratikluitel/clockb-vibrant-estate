import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { NEWSINSIGHTCATEGORY } from "@/lib/types";
import { ProjectCatSchema } from "./schema";

export type InputType = z.infer<typeof ProjectCatSchema>;
export type ReturnType = ActionState<InputType, NEWSINSIGHTCATEGORY>;
