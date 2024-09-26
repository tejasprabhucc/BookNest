"use client";

import { IMember } from "@/src/lib/definitions";
import React from "react";
import { InlineWidget } from "react-calendly";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { X } from "lucide-react";

interface EditScheduleProps {
  url: string;
  user: IMember;
  triggerButton?: React.ReactNode;
}

const EditSchedule: React.FC<EditScheduleProps> = ({
  url,
  user,
  triggerButton,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Your Schedule</DialogTitle>
          <DialogDescription>
            Use the calendar below to update your availability.
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="flex-grow">
          <InlineWidget
            url={url}
            styles={{
              height: "100%",
              width: "100%",
            }}
            prefill={{ name: user.name, email: user.email }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSchedule;
