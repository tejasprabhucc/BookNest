import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { IPagedResponse, IProfessor } from "@/src/lib/definitions";
import { fetchProfessors } from "@/src/lib/actions";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Book, GraduationCap, Mail, User } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const ProfessorsPage = async () => {
  const result = (await fetchProfessors({
    offset: 0,
    limit: 10,
  })) as IPagedResponse<IProfessor>;
  const professors = result.items.filter((items) => items.calendlyLink);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold my-6 lg:text-5xl">Professors</h1>

      {professors && professors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professors.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No professors available at the moment.
        </p>
      )}
    </div>
  );
};

const ProfessorCard = ({ professor }: { professor: IProfessor }) => {
  return (
    <div className="w-full">
      <Card className="h-full flex flex-col overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">
                {professor.name}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {professor.department}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {professor.shortBio}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${professor.email}`}
                className="text-blue-500 hover:underline"
              >
                {professor.email}
              </a>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" asChild>
            {/* <Link href={`/dashboard/professors/${professor.id}/schedule`}>
              Book Appointment
            </Link> */}
            <Link href={`/dashboard/professors/${professor.id}/pay`}>
              Book Appointment
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfessorsPage;
