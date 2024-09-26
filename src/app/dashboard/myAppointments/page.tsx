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
  getUserByEmail,
  getUsersAppointments,
  getUserSession,
} from "@/src/lib/actions";
import { ICalendlyEvent, IMember } from "@/src/lib/definitions";
import { Calendar, Clock, Link, User, RefreshCcw, X } from "lucide-react";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditSchedule from "@/src/components/appointment/editSchedule";
import { SiGooglemeet } from "react-icons/si";

const MyAppointments = async () => {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const email = session.email;
  const user = (await getUserByEmail(email)) as IMember;
  const appointments: ICalendlyEvent[] = await getUsersAppointments(email);

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

                    <DropdownMenuContent align="end" className="w-56">

                      <DropdownMenuItem asChild>
                        <EditSchedule
                          url={appointment.rescheduleLink}
                          user={user}
                          triggerButton={
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                          }
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <EditSchedule
                          url={appointment.cancelLink}
                          user={user}
                          triggerButton={
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          }
                        />
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
    </div>
  );
};

export default MyAppointments;
