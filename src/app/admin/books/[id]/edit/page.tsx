import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { getBookById } from "@/src/lib/actions";
import EditBookForm from "@/src/components/edit-book-form";
import React from "react";
import { IBook } from "@/src/lib/definitions";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const book = (await getBookById(params.id)) as IBook;

  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Update Book Details
          </CardTitle>
          <CardDescription>
            Fill out the form to update the book.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditBookForm book={book} />
        </CardContent>
      </Card>
    </>
  );
};

export default EditBook;
