import { jobFilterSchema } from "@/lib";
import { z } from "zod";

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
