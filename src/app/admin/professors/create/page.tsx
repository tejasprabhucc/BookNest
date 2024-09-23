import ProfessorCreateForm, {
  ProfessorFormField,
} from "@/src/components/create-professor-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { createBook, createProfessor } from "@/src/lib/actions";
import React from "react";

const CreateProfessor = () => {
  const professorsFields: ProfessorFormField[] = [
    {
      label: "name",
      type: "text",
      name: "name",
      placeholder: "Enter professor name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter email",
    },
    {
      label: "Department",
      type: "text",
      name: "department",
      placeholder: "Enter department name",
    },
    {
      label: "Short bio",
      type: "textarea",
      name: "shortBio",
      placeholder: "Enter a short bio about professor.",
    },
    {
      label: "Calendly Link",
      type: "text",
      name: "calendlyLink",
      placeholder: "Enter the calendly link.",
    },
  ];

  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add Book Details</CardTitle>
          <CardDescription>
            Fill out the form to add a new book.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfessorCreateForm
            type="create"
            fields={professorsFields}
            action={createProfessor}
            redirectUrl="/admin/professors"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateProfessor;
