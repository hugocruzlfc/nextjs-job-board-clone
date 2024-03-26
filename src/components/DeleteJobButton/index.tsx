"use client";

import { useFormState } from "react-dom";
import { FormSubmitButton } from "../FormSubmitButton";
import { deleteJob } from "@/actions";

interface DeleteJobButtonProps {
  jobId: number;
}

function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

export default DeleteJobButton;
