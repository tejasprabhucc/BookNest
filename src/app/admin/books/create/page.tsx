import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import React from "react";
import Form, { FormField } from "@/src/components/form";
import { createBook } from "@/src/lib/actions";

const Create = () => {
  const bookFields: FormField[] = [
    {
      label: "Title",
      type: "text",
      name: "title",
      placeholder: "Enter book title",
    },
    {
      label: "Author",
      type: "text",
      name: "author",
      placeholder: "Enter author name",
    },
    {
      label: "Publisher",
      type: "text",
      name: "publisher",
      placeholder: "Enter publisher name",
    },
    {
      label: "ISBN",
      type: "text",
      name: "isbnNo",
      placeholder: "Enter ISBN number",
    },
    {
      label: "Pages",
      type: "number",
      name: "numOfPages",
      placeholder: "Enter number of copies",
    },
    {
      label: "Genre",
      type: "text",
      name: "genre",
      placeholder: "Enter book genre",
    },
    {
      label: "Total Copies",
      type: "number",
      name: "totalNumOfCopies",
      placeholder: "Enter total number of copies",
    },
    {
      label: "Price",
      type: "number",
      name: "price",
      placeholder: "Enter book cost",
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
          <Form
            type="create"
            fields={bookFields}
            action={createBook}
            dataType="book"
            redirectUrl="/admin/books"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Create;
