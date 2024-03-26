import { JobFilterSidebar, JobsResults } from "@/components";
import H1 from "@/components/ui/h1";
import { JobFilterValues, SearchParams } from "@/types";
import { getTitle } from "@/utils";

interface PageProps {
  searchParams: SearchParams;
}

export function generateMetadata({
  search,
  location,
  type,
  remote,
}: SearchParams) {
  const title = `${getTitle({ search, location, type, remote: remote === "true" })} | "Flow Jobs"`;
  return {
    title,
  };
}

export default function Home({
  searchParams: { search, location, type, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    search,
    location,
    type,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobsResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
