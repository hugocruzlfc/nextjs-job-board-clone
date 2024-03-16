import React from "react";
import { JobsListItem } from "../JobsListItems";
import prisma from "@/lib/prisma";

export const JobsResults: React.FC = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobsListItem key={job.id} job={job} />
      ))}
    </div>
  );
};
