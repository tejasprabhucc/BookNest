import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { CreateButton, EditButton } from "@/src/components/ui/customButtons";
import {
  getUserById,
  getUserSession,
  getUserTransactionSummary,
} from "@/src/lib/actions";
import { IMember } from "@/src/lib/definitions";
import {
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Clock,
  CalendarClock,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const name = session.name;
  const image = session.image;

  const user = (await getUserById(session.id)) as IMember;
  const userData = (await getUserById(session.id)) as IMember;
  const userTransactionSummary = await getUserTransactionSummary(session.id);

  return (
    <Card className="w-max mt-10 mx-auto">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">PROFILE</h1>
          <EditButton
            url={`/dashboard/profile/${user.id}/edit`}
            label="Edit Profile"
          />
        </div>

        <div className="flex flex-col items-center md:flex-row gap-6 mb-8">
          <Avatar className="w-24 h-24">
            {userData.image && (
              <Image
                src={userData.image}
                width={36}
                height={36}
                alt="Avatar"
                className="rounded-full"
                style={{ aspectRatio: "36/36", objectFit: "cover" }}
              />
            )}
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>

            <Badge variant="secondary" className="text-sm font-medium">
              {userData.role.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                CONTACT DETAILS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <p className="text-foreground">{userData.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  {userData.phone ? (
                    <p className="text-foreground">{userData.phone}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No phone number provided
                    </p>
                  )}
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  {userData.address ? (
                    <p className="text-foreground">{userData.address}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Address not available
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">LIBRARY STATS</h3>
              {userTransactionSummary && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <div className="flex items-center  mb-1">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span className="font-semibold">
                        {userTransactionSummary?.borrowedBooks +
                          userTransactionSummary?.returnedBooks}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">TOTAL BORROWED</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-semibold">
                        {userTransactionSummary?.pendingRequest}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">PENDING REQUESTS</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <CalendarClock className="w-4 h-4 mr-2" />
                      <span className="font-semibold">
                        {userTransactionSummary?.booksDue}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">BOOKS DUE</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}
