import { NewJobForm } from "@/components";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a new job",
};

const Page: NextPage = () => {
  return (
    <div>
      <NewJobForm />
    </div>
  );
};

export default Page;
