import { JobFilterSidebar, JobsResults } from "@/components";
import H1 from "@/components/ui/h1";
import { JobFilterValues, SearchParams } from "@/types";

interface PageProps {
  searchParams: SearchParams;
}

export default function Home({
  searchParams: { search, location, type, remote },
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
        <H1> Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobsResults filterValues={filterValues} />
      </section>
    </main>
  );
}
