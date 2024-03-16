import { jobFilterSchema } from "@/lib";
import { redirect } from "next/navigation";

export async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { search, location, type, remote } = jobFilterSchema.parse(values);

  const queryParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(location && { location }),
    ...(type && { type }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${queryParams.toString()}`);
}
