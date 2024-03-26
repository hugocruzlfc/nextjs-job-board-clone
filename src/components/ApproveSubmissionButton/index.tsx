"use client";

import { useFormState } from "react-dom";
import { FormSubmitButton } from "../FormSubmitButton";
import { approveSubmission } from "@/actions";

interface ApproveSubmissionButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: ApproveSubmissionButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

export default ApproveSubmissionButton;
