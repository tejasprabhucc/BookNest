import React from "react";
import { InlineWidget } from "react-calendly";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { IMember } from "@/src/lib/definitions";

interface EditScheduleProps {
  url: string;
  user: IMember;
  onClose: () => void;
}

const EditSchedule: React.FC<EditScheduleProps> = ({ url, user, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl ">
        <DialogHeader className="h-max">
          <DialogTitle>Edit Your Schedule</DialogTitle>
          <DialogDescription>
            Use the calendar below to update your availability.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[80vh]">
          <InlineWidget
            url={url}
            prefill={{
              name: user.name,
              email: user.email,
            }}
            styles={{
              height: "100%",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSchedule;
