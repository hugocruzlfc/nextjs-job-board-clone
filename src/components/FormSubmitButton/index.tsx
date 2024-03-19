"use client";
import React from "react";
import { Button } from "../ui";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import LoadingButton from "../LoadingButton";

export function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} type="submit" loading={pending} />;
}
