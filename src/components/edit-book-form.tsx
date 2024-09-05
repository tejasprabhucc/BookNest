"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { IBook } from "../lib/definitions";
import { editBook } from "../lib/actions";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const EditBookForm = ({ book }: { book: IBook }) => {
  const initialState = { message: "", loading: false };
  const [state, formAction] = useActionState(editBook, initialState);

  useEffect(() => {
    if (state.message === "Book updated successfully!") {
      redirect(`/admin/books`);
    }
  }, [state.message]);

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg"
    >
      <input type="hidden" name="id" value={book.id} />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={book.title}
            placeholder="Enter book title"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="author" className="text-sm font-medium">
            Author
          </Label>
          <Input
            id="author"
            name="author"
            defaultValue={book.author}
            placeholder="Enter author name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="publisher" className="text-sm font-medium">
            Publisher
          </Label>
          <Input
            id="publisher"
            name="publisher"
            defaultValue={book.publisher}
            placeholder="Enter publisher name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="genre" className="text-sm font-medium">
            Genre
          </Label>
          <Input
            id="genre"
            name="genre"
            defaultValue={book.genre}
            placeholder="Enter book genre"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="isbn" className="text-sm font-medium">
            ISBN
          </Label>
          <Input
            id="isbn"
            name="isbn"
            defaultValue={book.isbnNo}
            placeholder="Enter ISBN number"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pages" className="text-sm font-medium">
            Pages
          </Label>
          <Input
            id="pages"
            name="numOfPages"
            type="number"
            defaultValue={book.numOfPages}
            placeholder="Enter number of pages"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="total-copies" className="text-sm font-medium">
            Total Copies
          </Label>
          <Input
            id="total-copies"
            name="totalNumOfCopies"
            type="number"
            defaultValue={book.totalNumOfCopies}
            placeholder="Enter total copies"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="available-copies" className="text-sm font-medium">
            Available Copies
          </Label>
          <Input
            id="available-copies"
            name="availableNumOfCopies"
            type="number"
            defaultValue={book.availableNumOfCopies}
            placeholder="Enter available copies"
          />
        </div>
      </div>
      <div id="error" aria-live="polite" aria-atomic="true">
        {state?.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md shadow-sm border hover:bg-secondary hover:border-primary hover:text-primary transition duration-150"
        >
          {"Update Book"}
        </Button>
      </div>
    </form>
  );
};

export default EditBookForm;
