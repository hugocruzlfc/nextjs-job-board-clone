"use client";
import React from "react";
import { Button } from "../ui";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...props} disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
}
