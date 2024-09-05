"use client";
import React, { useActionState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { createBook, State } from "../lib/actions";
import { Button } from "./ui/button";
import { ToastAction } from "@radix-ui/react-toast";
import { toast } from "./hooks/use-toast";

const CreateBookForm = () => {
  const initialState = { message: "", loading: false };
  const [state, formAction] = useActionState(createBook, undefined);

  if (state?.message) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="space-y-4">
        <div className="grid gap-1">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter book title"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="author" className="text-sm font-medium">
            Author
          </Label>
          <Input
            id="author"
            name="author"
            placeholder="Enter author name"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="publisher" className="text-sm font-medium">
            Publisher
          </Label>
          <Input
            id="publisher"
            name="publisher"
            placeholder="Enter publisher name"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="genre" className="text-sm font-medium">
            Genre
          </Label>
          <Input
            id="genre"
            name="genre"
            placeholder="Enter book genre"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-1">
          <Label htmlFor="isbn" className="text-sm font-medium">
            ISBN
          </Label>
          <Input
            id="isbn"
            name="isbnNo"
            placeholder="Enter ISBN number"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="pages" className="text-sm font-medium">
            Pages
          </Label>
          <Input
            id="pages"
            type="number"
            name="numOfPages"
            placeholder="Enter number of pages"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="total-copies" className="text-sm font-medium">
            Total Copies
          </Label>
          <Input
            id="total-copies"
            type="number"
            name="totalNumOfCopies"
            placeholder="Enter total copies"
            className="border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div id="error" aria-live="polite" aria-atomic="true">
        {state?.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-white py-2 px-4 rounded-md shadow-sm border hover:bg-secondary hover:border-primary hover:text-primary transition duration-150">
          Add Book
        </Button>
      </div>
    </form>
  );
};

export default CreateBookForm;
