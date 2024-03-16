import { z } from "zod";

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
