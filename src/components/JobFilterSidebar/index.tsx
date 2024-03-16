import React from "react";
import { filterJobs } from "@/actions";
import { Button, Input, Label } from "../ui";
import Select from "../ui/select";
import prisma from "@/lib/prisma";
import { JobFilterValues, Jobs } from "@/types";
import { FormSubmitButton } from "../FormSubmitButton";

export interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = async ({
  defaultValues,
}) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              name="search"
              placeholder="Title, company, etc..."
              defaultValue={defaultValues.search}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              id="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {Object.values(Jobs).map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              name="location"
              id="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="remote"
              id="remote"
              value="true"
              className="h-5 w-5 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};
