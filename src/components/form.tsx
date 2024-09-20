"use client";
import React, { useActionState, useState } from "react";
import { IBook, IMember } from "../lib/definitions";
import clsx from "clsx";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { toast } from "./hooks/use-toast";
import { redirect } from "next/navigation";
import { UploadButton, UploadDropzone } from "@/src/utils/uploadthing";
import { FileImage } from "lucide-react";
import Image from "next/image";

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
  const [imageURL, setImageURL] =
    useState();
    // "https://utfs.io/f/MOsMgVcTj5RzWaFm0yVUBhIkNwtGCrJAvqc3fWm1VSME0z2O"

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
    redirect(redirectUrl);
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
          {field.type === "uploadThing" ? (
            <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              {imageURL ? (
                <Image
                  src={imageURL}
                  width={150}
                  height={200}
                  alt="Book Cover Preview"
                  className=" w-full h-full object-contain"
                />
              ) : (
                <>
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Uploaded image:", res);
                    }}
                    onUploadError={(error) => {
                      console.error("Error uploading image:", error);
                    }}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1 h-full">
                    <FileImage color="gray" />
                    <p className="text-gray-500">Drag and drop an image here</p>
                    <p className="text-sm text-gray-400">or</p>
                    <Button
                      variant={"outline"}
                      type="button"
                      className="px-4 py-2 rounded-md"
                    >
                      Choose File
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
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
          )}
        </div>
      ))}
      <Input type="hidden" name="image" value={imageURL} />

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
