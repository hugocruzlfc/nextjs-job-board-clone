import { JobFilterValues } from "@/types";
import { Prisma } from "@prisma/client";

export function buildFilters(filterValues: JobFilterValues) {
  const { search, location, type, remote } = filterValues;

  const searchForDB = search
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const formattedFilter: Prisma.JobWhereInput = searchForDB
    ? {
        OR: [
          {
            title: {
              search: searchForDB,
            },
          },
          {
            companyName: {
              search: searchForDB,
            },
          },
          {
            type: {
              search: searchForDB,
            },
          },
          {
            locationType: {
              search: searchForDB,
            },
          },
          {
            location: {
              search: searchForDB,
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      formattedFilter,
      type ? { type } : {},
      location ? { location: location } : {},
      remote ? { locationType: "Remote" } : {},
      {
        approved: true,
      },
    ],
  };

  return where;
}
