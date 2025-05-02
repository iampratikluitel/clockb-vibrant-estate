import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { NEWSINSIGHTCATEGORY } from "@/lib/types";
import { NewsCatSchema } from "./schema";

export type InputType = z.infer<typeof NewsCatSchema>;
export type ReturnType = ActionState<InputType, NEWSINSIGHTCATEGORY>;
