import { z } from "zod";

const contentSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    link: z.string().url().min(1, "Link is required"),
    image:z.any()
});

export const LandingPageSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),

    description: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    
    card4icon: z.any(),
    card5icon: z.any(),
    card6icon: z.any(),
    card7icon: z.any(),
    
    card1name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card2name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card3name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card4name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card5name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card6name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card7name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card8name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card9name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    card10name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),

    card1description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card2description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card3description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card4description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card5description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card6description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card7description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card8description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card9description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),
    card10description: z.string().min(2, {
        message: "description must be at least 2 characters.",
    }),

    backgrounImage:z.any(),
})