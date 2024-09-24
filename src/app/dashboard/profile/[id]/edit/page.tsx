import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { editMember, getBookById, getUserById } from "@/src/lib/actions";
import EditBookForm from "@/src/components/edit-book-form";
import React from "react";
import { IBook, IMember } from "@/src/lib/definitions";
import Form, { FormField } from "@/src/components/form";

const EditProfile = async ({ params }: { params: { id: string } }) => {
  const userData = (await getUserById(Number(params.id))) as IMember;
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
      label: "Phone",
      type: "text",
      name: "phone",
      placeholder: "Enter Phone number",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "Enter your address",
    },
  ];
  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
          <CardDescription>
            Fill out the form to update your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <EditBookForm book={book} /> */}
          <Form
            type="edit"
            fields={memberFields}
            action={editMember}
            data={userData}
            dataType="member"
            redirectUrl="/dashboard/profile"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default EditProfile;
