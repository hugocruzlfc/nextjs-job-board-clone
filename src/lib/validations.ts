import { z } from "zod";
import { Jobs, Location } from "@/types";

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File size must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine(
    (application) => application.applicationEmail || application.applicationUrl,
    {
      message: "Email or URL is required",
      path: ["applicationEmail"],
    },
  );

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(3, "Required minimum 3 characters")
      .refine(
        (type) => Object.values(Location).includes(type as Location),
        "Invalid location type",
      ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (location) =>
      !location.locationType ||
      location.location === "Remote" ||
      location.location,
    {
      message: "Location is required",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: z
      .string()
      .min(3, "Required minimum 3 characters")
      .max(100, "Maximum 100 characters"),
    type: z
      .string()
      .min(3, "Required minimum 3 characters")
      .refine((type) => Object.values(Jobs).includes(type as Jobs), {
        message: "Invalid job type",
      }),
    companyName: z
      .string()
      .min(3, "Required minimum 3 characters")
      .max(100, "Maximum 100 characters"),
    companyLogo: companyLogoSchema,
    description: z.string().max(1000, "Maximum 1000 characters").optional(),
    salary: z
      .string()
      .min(1, "Required")
      .regex(/^\d+$/, "Must be a number")
      .max(9, "Maximum 9 digits"),
    location: z.string(),
    remote: z.coerce.boolean(),
    applyUrl: z.string(),
    logoUrl: z.string(),
    email: z.string().email(),
  })
  .and(applicationSchema)
  .and(locationSchema);
