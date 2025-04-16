import { z } from "zod";

const FormSchema = z.object({
  card1title: z.string(),
  card1description: z.string(),
  card1Date: z.string().optional(),

  card2title: z.string(),
  card2description: z.string(),
  card2Date: z.string().optional(),

  card3title: z.string(),
  card3description: z.string(),
  card3Date: z.string().optional(),

  card4title: z.string(),
  card4description: z.string(),
  card4Date: z.string().optional(),

  card5title: z.string(),
  card5description: z.string(),
  card5Date: z.string().optional(),
});

export default FormSchema;
export type FormSchemaType = z.infer<typeof FormSchema>;
