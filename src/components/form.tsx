"use client";
import React, { useActionState } from "react";
import { IBook, IMember } from "../lib/definitions";
import clsx from "clsx";
import { Input } from "@/src/components/ui/input";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { toast } from "./hooks/use-toast";
import { redirect } from "next/navigation";

type FormFieldNames = keyof IBook | keyof IMember;

export interface FormField {
  label: string;
  type: string;
  name: FormFieldNames;
  placeholder?: string;
}

interface FormProps {
  type: "create" | "edit";
  fields: FormField[];
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
  data?: IBook | IMember;
  dataType: "book" | "member";
  redirectUrl: string;
}

const Form = ({
  type,
  fields,
  action,
  data,
  dataType,
  redirectUrl,
}: FormProps) => {
  const initialState = { message: "" };
  const [state, formAction] = useActionState(action, initialState);

  let typedData: IBook | IMember | null = null;

  if (data && dataType === "book") {
    typedData = data as IBook;
  } else if (data && dataType === "member") {
    typedData = data as IMember;
  }

  if (state.message.toLocaleLowerCase().includes("success")) {
    toast({
      title: state.message,
    });
    // redirect(redirectUrl);
  }

  return (
    <form
      action={formAction}
      className={clsx(
        fields.length > 5 ? "md:grid-cols-2" : "w-2/3",
        "grid grid-cols-1 gap-4 p-6 bg-white rounded-lg shadow-lg"
      )}
    >
      {type === "edit" && typedData && (
        <input type="hidden" name="id" value={typedData.id} />
      )}

      {fields.map((field) => (
        <div key={field.name as string} className="grid gap-1">
          <label htmlFor={field.name as string} className="text-sm font-medium">
            {field.label}
          </label>

          <Input
            id={field.name as string}
            name={field.name as string}
            type={field.type}
            defaultValue={
              type === "edit" && typedData
                ? typedData[field.name as keyof typeof typedData]
                : ""
            }
            placeholder={field.placeholder}
            className="border-gray-300 rounded-md"
            required
          />
        </div>
      ))}

      <div id="error" aria-live="polite" aria-atomic="true">
        {state?.message && !state.message.toLowerCase().includes("success") && (
          <p className="mt-2 text-sm text-red-500 min-h-4 block">
            {state.message}
          </p>
        )}
      </div>

      <div className="flex gap-4 justify-start">
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md shadow-sm border hover:bg-secondary hover:border-primary hover:text-primary transition duration-150"
        >
          {type === "create" ? `Create ${dataType}` : `Update ${dataType}`}
        </button>

        <Link href={redirectUrl}>
          <Button
            variant="outline"
            className=" py-2 px-4 rounded-md shadow-sm border hover:bg-secondary hover:border-primary hover:text-primary transition duration-150"
          >
            {"Cancel"}
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default Form;
