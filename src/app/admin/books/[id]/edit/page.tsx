import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { editBook, getBookById } from "@/src/lib/actions";
import EditBookForm from "@/src/components/edit-book-form";
import React from "react";
import { IBook } from "@/src/lib/definitions";
import Form, { FormField } from "@/src/components/form";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const bookData = (await getBookById(params.id)) as IBook;
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
      label: "Available Copies",
      type: "number",
      name: "availableNumOfCopies",
      placeholder: "Enter available number of copies",
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
      <Card className="w-5/6 max-w-2xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Update Book Details
          </CardTitle>
          <CardDescription>
            Fill out the form to update the book.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <EditBookForm book={book} /> */}
          <Form
            type="edit"
            fields={bookFields}
            action={editBook}
            dataType="book"
            data={bookData}
            redirectUrl="/admin/books"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default EditBook;
