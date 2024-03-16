import { JobFilterValues } from "@/types";

export function getTitle(filterValues: JobFilterValues) {
  const { search, location, type, remote } = filterValues;

  const titlePrefix = search
    ? `${search} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? `Remote developer jobs`
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}
