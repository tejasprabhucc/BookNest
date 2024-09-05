import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import React from "react";
import CreateBookForm from "@/src/components/create-book-form";

const Create = () => {
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
          <CreateBookForm />
        </CardContent>
      </Card>
    </>
  );
};

export default Create;
