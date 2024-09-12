import Form, { FormField } from "@/src/components/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { createBook, createMember } from "@/src/lib/actions";
import React from "react";

const Create = () => {
  const memberFields: FormField[] = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Enter member's name",
    },
    {
      label: "Age",
      type: "number",
      name: "age",
      placeholder: "Enter member's age",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter email id",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter password",
    },
    {
      label: "Role",
      type: "text",
      name: "role",
      placeholder: "Enter member's role",
    },
  ];

  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Add Member Details
          </CardTitle>
          <CardDescription>
            Fill out the form to add a new member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            type="create"
            fields={memberFields}
            action={createMember}
            dataType="member"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Create;
