"use client";

import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ICalendlyEvent, IMember } from "@/src/lib/definitions";
import {
  Calendar,
  Clock,
  User,
  RefreshCcw,
  X,
  MoreHorizontal,
} from "lucide-react";
import { SiGooglemeet } from "react-icons/si";
import EditSchedule from "@/src/components/appointment/editSchedule";

interface MyAppointmentsProps {
  appointments: ICalendlyEvent[];
  user: IMember;
}

const MyAppointments: React.FC<MyAppointmentsProps> = ({
  appointments,
  user,
}) => {
  const [editScheduleUrl, setEditScheduleUrl] = React.useState<string | null>(
    null
  );

  const handleReschedule = (url: string) => {
    setEditScheduleUrl(url);
  };

  const handleCancel = (url: string) => {
    setEditScheduleUrl(url);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold my-6 lg:text-5xl">My Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                    {appointment.event}
                    <Badge className="ml-3" variant="outline">
                      {appointment.status}
                    </Badge>
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">
                          Open appointment options
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 z-50">
                      <DropdownMenuItem
                        onSelect={() =>
                          handleReschedule(appointment.rescheduleLink)
                        }
                      >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleCancel(appointment.cancelLink)}
                        className="text-red-600 hover:text-red-600 hover:bg-red-100"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">
                    {new Date(appointment.start_time).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">
                    {new Date(appointment.start_time).toLocaleTimeString()} -
                    {new Date(appointment.end_time).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {appointment.organizers.map((organizer, idx) => (
                      <TooltipProvider key={idx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p>{organizer.name}</p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs text-muted-foreground">
                              {organizer.email}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="default" className="w-full" asChild>
                  <a
                    href={appointment.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGooglemeet className="mr-2 h-4 w-4" />
                    Join Meeting
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No appointments scheduled.
          </p>
        )}
      </div>
      {editScheduleUrl && (
        <EditSchedule
          url={editScheduleUrl}
          user={user}
          onClose={() => setEditScheduleUrl(null)}
        />
      )}
    </div>
  );
};

export default MyAppointments;
