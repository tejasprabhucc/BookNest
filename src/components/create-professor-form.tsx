"use client";
import React, { useActionState, useState } from "react";
import { IProfessor } from "../lib/definitions";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useToast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter } from "./ui/card";

type FormFieldNames = keyof IProfessor;

export interface ProfessorFormField {
  label: string;
  type: string;
  name: FormFieldNames;
  placeholder?: string;
}

interface FormProps {
  type: "create" | "edit";
  fields: ProfessorFormField[];
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
  data?: IProfessor;
  redirectUrl: string;
}

const ProfessorCreateForm = ({
  type,
  fields,
  action,
  data,
  redirectUrl,
}: FormProps) => {
  const initialState = { message: "" };
  const [state, formAction] = useActionState(action, initialState);
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await action({}, formData);
      if (result.message.toLowerCase().includes("success")) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.push(redirectUrl);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {type === "edit" && data && (
          <input type="hidden" name="id" value={data.id} />
        )}

        {fields.map((field) => (
          <div key={field.name as string} className="space-y-2">
            {field.type !== "hidden" && (
              <label
                htmlFor={field.name as string}
                className="text-sm font-medium"
              >
                {field.label}
              </label>
            )}
            <Input
              id={field.name as string}
              name={field.name as string}
              type={field.type}
              defaultValue={
                type === "edit" && data
                  ? data[field.name as keyof typeof data]
                  : ""
              }
              placeholder={field.placeholder}
              className="w-full"
              required
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={redirectUrl}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {type === "create" ? `Create Professor` : `Update Professor`}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ProfessorCreateForm;
