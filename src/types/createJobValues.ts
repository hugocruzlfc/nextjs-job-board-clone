import { createJobSchema } from "@/lib";
import { z } from "zod";

export type CreateJobValues = z.infer<typeof createJobSchema>;
