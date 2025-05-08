import { z } from "zod";

const DevelopmentPhaseSchema = z.object({
  card1title: z.string(),
  card1description: z.string(),
  card1Date: z.string().optional(),

  card2title: z.string(),
  card2description: z.string(),
  card2Date: z.string().optional(),

  card3title: z.string(),
  card3description: z.string(),
  card3Date: z.string().optional(),
});

export default DevelopmentPhaseSchema;