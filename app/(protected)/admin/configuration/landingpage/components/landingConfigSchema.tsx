import { z } from "zod";

const FormSchema = z.object({
  card1title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." }),
  card1description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  card1Date: z.string().transform((str) => str ? new Date(str) : undefined),
  card2title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." }),
  card2description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  card2Date: z.string().transform((str) => str ? new Date(str) : undefined),
  card3title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." }),
  card3description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  card3Date: z.string().transform((str) => str ? new Date(str) : undefined),
  card4title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." }),
  card4description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  card4Date: z.string().transform((str) => str ? new Date(str) : undefined),
  card5title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." }),
  card5description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  card5Date: z.string().transform((str) => str ? new Date(str) : undefined),
});

export default FormSchema