import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service type"),
  address: z.string().min(5, "Please enter your address"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const estimateFormSchema = z.object({
  projectType: z.enum([
    "kitchen",
    "bathroom",
    "adu",
    "room-addition",
    "painting-interior",
    "painting-exterior",
    "roofing",
    "flooring",
    "windows",
    "outdoor",
    "commercial",
    "full-remodel",
  ]),
  qualityTier: z.enum(["standard", "mid-range", "premium"]),
  squareFootage: z.number().min(1, "Square footage must be at least 1"),
  county: z.enum([
    "los-angeles",
    "san-bernardino",
    "orange",
    "riverside",
    "ventura",
    "inland-empire",
  ]),
  timeline: z.enum(["standard", "rush"]),
  includePermits: z.boolean(),
});

export type EstimateFormData = z.infer<typeof estimateFormSchema>;
