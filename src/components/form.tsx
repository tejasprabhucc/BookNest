"use client";
import React, { useActionState, useState } from "react";
import { IBook, IMember } from "../lib/definitions";
import clsx from "clsx";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { toast, useToast } from "./hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "@/src/utils/uploadthing";
import { FileImage, Loader2 } from "lucide-react";
import Image from "next/image";
import { CardContent, CardFooter } from "./ui/card";

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
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  let typedData: IBook | IMember | null = null;

  if (data && dataType === "book") {
    typedData = data as IBook;
  } else if (data && dataType === "member") {
    typedData = data as IMember;
  }

  const [imageURL, setImageURL] = useState<string>();

  const handleUploadComplete = (res: any) => {
    console.log("Uploaded image:", res);
    if (res && res[0] && res[0].url) {
      setImageURL(res[0].url);
    }
  };

  const handleUploadError = (error: Error) => {
    toast({
      title: "Error",
      description: "Failed to upload image. Please try again.",
      variant: "destructive",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.append("image", imageURL || "");

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
        {type === "edit" && typedData && (
          <input type="hidden" name="id" value={typedData.id} />
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
                type === "edit" && typedData
                  ? typedData[field.name as keyof typeof typedData]
                  : ""
              }
              placeholder={field.placeholder}
              className="w-full"
              required
            />
          </div>
        ))}

        <Input type="hidden" name="image" value={imageURL} />

        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          <div className="flex flex-col items-center space-y-4">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              appearance={{
                button:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              }}
            />
            {imageURL && (
              <div className="relative w-full h-64">
                <Image
                  src={imageURL}
                  alt="Preview"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={redirectUrl}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {type === "create" ? `Create ${dataType}` : `Update ${dataType}`}
        </Button>
      </CardFooter>
    </form>
  );
};

export default Form;

// "use client";

// import React, { useActionState, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IBook, IMember } from "@/src/lib/definitions";
// import { Input } from "@/src/components/ui/input";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { UploadButton } from "@/src/utils/uploadthing";
// import { FileImage, Loader2 } from "lucide-react";
// import { useToast } from "./hooks/use-toast";

// type FormFieldNames = keyof IBook | keyof IMember;

// export interface FormField {
//   label: string;
//   type: string;
//   name: FormFieldNames;
//   placeholder?: string;
// }

// interface FormProps {
//   type: "create" | "edit";
//   fields: FormField[];
//   action: (prevState: any, formData: FormData) => Promise<{ message: string }>;
//   data?: IBook | IMember;
//   dataType: "book" | "member";
//   redirectUrl: string;
// }

// const EnhancedForm = ({
//   type,
//   fields,
//   action,
//   data,
//   dataType,
//   redirectUrl,
// }: FormProps) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [imageURL, setImageURL] = useState<string>();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const initialState = { message: "" };
//   const [state, formAction] = useActionState(action, initialState);

//   let typedData: IBook | IMember | null = null;

//   if (data && dataType === "book") {
//     typedData = data as IBook;
//   } else if (data && dataType === "member") {
//     typedData = data as IMember;
//   }

//   const handleUploadComplete = (res: any) => {
//     console.log("Uploaded image:", res);
//     if (res && res[0] && res[0].url) {
//       setImageURL(res[0].url);
//     }
//   };

//   const handleUploadError = (error: Error) => {
//     console.error("Error uploading image:", error);
//     toast({
//       title: "Error",
//       description: "Failed to upload image. Please try again.",
//       variant: "destructive",
//     });
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     const formData = new FormData(event.currentTarget);
//     formData.append("image", imageURL || "");

//     try {
//       const result = await action({}, formData);
//       if (result.message.toLowerCase().includes("success")) {
//         toast({
//           title: "Success",
//           description: result.message,
//         });
//         router.push(redirectUrl);
//       } else {
//         toast({
//           title: "Error",
//           description: result.message,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle>
//           {type === "create" ? `Create ${dataType}` : `Edit ${dataType}`}
//         </CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           {type === "edit" && typedData && (
//             <input type="hidden" name="id" value={typedData.id} />
//           )}

//           {fields.map((field) => (
//             <div key={field.name as string} className="space-y-2">
//               <label
//                 htmlFor={field.name as string}
//                 className="text-sm font-medium"
//               >
//                 {field.label}
//               </label>
//               <Input
//                 id={field.name as string}
//                 name={field.name as string}
//                 type={field.type}
//                 defaultValue={
//                   type === "edit" && typedData
//                     ? typedData[field.name as keyof typeof typedData]
//                     : ""
//                 }
//                 placeholder={field.placeholder}
//                 className="w-full"
//                 required
//               />
//             </div>
//           ))}

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Image</label>
//             <div className="flex flex-col items-center space-y-4">
//               <UploadButton
//                 endpoint="imageUploader"
//                 onClientUploadComplete={handleUploadComplete}
//                 onUploadError={handleUploadError}
//                 appearance={{
//                   button:
//                     "bg-primary text-primary-foreground hover:bg-primary/90",
//                 }}
//               />
//               {imageURL && (
//                 <div className="relative w-full h-64">
//                   <Image
//                     src={imageURL}
//                     alt="Preview"
//                     fill
//                     className="object-contain rounded-md"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Link href={redirectUrl}>
//             <Button variant="outline">Cancel</Button>
//           </Link>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             {type === "create" ? `Create ${dataType}` : `Update ${dataType}`}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// };

// export default EnhancedForm;
