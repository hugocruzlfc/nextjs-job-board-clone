import React from "react";
import { JobsListItem } from "../JobsListItems";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/types";
import { Prisma } from "@prisma/client";
import { buildFilters } from "@/utils";

interface JobsResultsProps {
  filterValues: JobFilterValues;
}

export const JobsResults: React.FC<JobsResultsProps> = async ({
  filterValues,
}) => {
  const where = buildFilters(filterValues);

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobsListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters
        </p>
      )}
    </div>
  );
};
