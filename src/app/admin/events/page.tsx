import AdminEventCard from "@/src/components/adminEventCard";
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
  getScheduledEvents,
  getUsersAppointments,
  getUserSession,
} from "@/src/lib/actions";
import { Calendar, Clock, Link, MapPin, User } from "lucide-react";
import { redirect } from "next/navigation";

const MyAppointments = async () => {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const email = session.email;
  // const appointments = await getScheduledEvents();
  const events = await getScheduledEvents();
  console.log(events);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <AdminEventCard key={index} event={event} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No appointments scheduled.
          </p>
        )}
      </div>
    </div>
    // <div className="container mx-auto py-12 px-4">
    //   <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {events && events.length > 0 ? (
    //       events.map((event, index) => (
    //         <Card key={index} className="flex flex-col">
    //           <CardHeader>
    //             <div className="flex justify-between items-start">
    //               <CardTitle className="text-2xl font-semibold">
    //                 {event.name}
    //               </CardTitle>
    //               <Badge
    //                 variant={
    //                   event.status === "active" ? "default" : "secondary"
    //                 }
    //               >
    //                 {event.status === "active" ? "Active" : "Inactive"}
    //               </Badge>
    //             </div>
    //           </CardHeader>
    //           <CardContent className="flex-grow space-y-4">
    //             <div className="flex items-center space-x-2">
    //               <Calendar className="h-5 w-5 text-muted-foreground" />
    //               <p className="text-sm">
    //                 {new Date(event.start_time).toLocaleDateString()}
    //               </p>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <Clock className="h-5 w-5 text-muted-foreground" />
    //               <p className="text-sm">
    //                 {new Date(event.start_time).toLocaleTimeString()} -
    //                 {new Date(event.end_time).toLocaleTimeString()}
    //               </p>
    //             </div>
    //             {event.location.type && (
    //               <div className="flex items-center space-x-2">
    //                 <MapPin className="h-5 w-5 text-muted-foreground" />
    //                 <p className="text-sm">{event.location.type}</p>
    //               </div>
    //             )}
    //             {event.invitees && event.invitees.length > 0 && (
    //               <div className="flex items-center space-x-2">
    //                 <User className="h-5 w-5 text-muted-foreground" />
    //                 <p className="text-sm">{event.invitees[0].name}</p>
    //               </div>
    //             )}
    //           </CardContent>
    //           <CardFooter>
    //             {event.location.join_url && (
    //               <Button variant="outline" className="w-full" asChild>
    //                 <a
    //                   href={event.location.join_url}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                 >
    //                   <Link className="mr-2 h-4 w-4" />
    //                   Join Meeting
    //                 </a>
    //               </Button>
    //             )}
    //           </CardFooter>
    //         </Card>
    //       ))
    //     ) : (
    //       <p className="col-span-full text-center text-muted-foreground">
    //         No appointments scheduled.
    //       </p>
    //     )}
    //   </div>
    // </div>
  );
};

export default MyAppointments;
