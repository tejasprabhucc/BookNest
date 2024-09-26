import CalendlyScheduleCard from "@/src/components/appointment/calendlyScheduleCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import {
  fetchProfessorById,
  getUserByEmail,
  getUserSession,
} from "@/src/lib/actions";
import { IMember, IProfessor } from "@/src/lib/definitions";
import { redirect } from "next/navigation";
import React from "react";

const AppointmentPage = async ({ params }: { params: { id: string } }) => {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const profId = Number(params.id);
  const userEmail = session?.email;

  const userData = (await getUserByEmail(userEmail)) as IMember;
  const professor = (await fetchProfessorById(profId)) as IProfessor;

  if (!professor) {
    return (
      <div className="container mx-auto py-12 px-4">Professor not found</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl mb-2">{professor.name}</CardTitle>
            <p className="text-muted-foreground mb-2">{professor.department}</p>
            <p className="">{professor.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className=" mb-4">{professor.shortBio}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Schedule an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendlyScheduleCard professor={professor} user={userData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentPage;
