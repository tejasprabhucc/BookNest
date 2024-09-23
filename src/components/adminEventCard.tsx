"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

const AdminEventCard = ({ event }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // You might want to show a toast notification here
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
          <Badge variant={event.status === "active" ? "default" : "secondary"}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm">
            {new Date(event.start_time).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm">
            {new Date(event.start_time).toLocaleTimeString()} -
            {new Date(event.end_time).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm">{event.location.type}</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm">
            Invitees: {event.invitees_counter.active}/
            {event.invitees_counter.limit}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(event.uri)}
        >
          <Copy className="h-4 w-4 mr-2" />
          Event ID
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
              <DialogDescription>
                Make changes to the appointment here.
              </DialogDescription>
            </DialogHeader> */}
        {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit({
                  ...event,
                  name: e.target.name.value,
                  start_time: e.target.start_time.value,
                  end_time: e.target.end_time.value,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={event.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start_time" className="text-right">
                    Start Time
                  </Label>
                  <Input
                    id="start_time"
                    type="datetime-local"
                    defaultValue={event.start_time.slice(0, 16)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end_time" className="text-right">
                    End Time
                  </Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    defaultValue={event.end_time.slice(0, 16)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form> */}
        {/* </DialogContent>
        </Dialog> */}
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        {event.location.join_url && (
          <Button variant="default" size="sm" asChild>
            <a
              href={event.location.join_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdminEventCard;
