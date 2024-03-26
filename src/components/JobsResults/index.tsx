import React from "react";
import { JobsListItem } from "../JobsListItems";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/types";
import { buildFilters } from "@/utils";
import Link from "next/link";
import Pagination from "../Pagination";

interface JobsResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

export const JobsResults: React.FC<JobsResultsProps> = async ({
  filterValues,
  page = 1,
}) => {
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;
  const where = buildFilters(filterValues);

  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`}>
          <JobsListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};
