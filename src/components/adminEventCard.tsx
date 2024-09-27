"use client";

import React from "react";
import { Calendar, Clock, User, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

interface Invitee {
  name: string;
  email: string;
}
interface Organizer {
  name: string;
  email: string;
}

interface Event {
  event: string;
  status: string;
  start_time: string;
  end_time: string;
  meetLink: string;
  organizers: Organizer[];
  invitees: Invitee[];
}

const AdminEventTable = ({ events }: { events: Event[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Meet Link</TableHead>
          <TableHead>Organizers</TableHead>
          <TableHead>Invitees</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell>{event.event}</TableCell>
            <TableCell>
              <Badge
                variant={event.status === "active" ? "default" : "secondary"}
              >
                {event.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(event.start_time).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(event.start_time).toLocaleTimeString()} -
                    {new Date(event.end_time).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button variant="link" size="sm" asChild>
                <a
                  href={event.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Meeting
                </a>
              </Button>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">
                        {event.organizers[0].name}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm">
                        {event.organizers[0].email}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4  text-blue-500" />
                      <span className="text-sm">{event.invitees[0].name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm">{event.invitees[0].email}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminEventTable;
