import AdminEventTable from "@/src/components/adminEventCard";
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
      <div className="">
        {events && events.length > 0 ? (
          <AdminEventTable events={events} />
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
