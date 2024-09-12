import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getUserDetails } from "@/src/lib/actions";
import {
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Clock,
  CalendarClock,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getUserDetails();
  if (!session) {
    redirect("/login");
  }
  const name = session.name;
  const image = session.user?.image;
  return (
    <Card className="w-max mt-10 mx-auto">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">PROFILE</h1>
          <Button variant={"default"}>EDIT PROFILE</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Avatar className="w-24 h-24">
            {image && (
              <Image
                src={image}
                width={36}
                height={36}
                alt="Avatar"
                className="rounded-full"
                style={{ aspectRatio: "36/36", objectFit: "cover" }}
              />
            )}
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{session.name}</h2>
            <p className="text-gray-500">Student • San Francisco, CA</p>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center">
                <ArrowUpRight className="text-green-500 mr-1" />
                <span className="font-semibold">15</span>
                <span className="text-gray-500 ml-1">Borrowed</span>
              </div>
              <div className="flex items-center">
                <ArrowDownRight className="text-red-500 mr-1" />
                <span className="font-semibold">3</span>
                <span className="text-gray-500 ml-1">Due</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">CONTACT DETAILS</h3>
              <div className="space-y-2">
                <p className="text-indigo-600">{session.email}</p>
                <p className="text-gray-600">123-456-7890</p>
                <p className="text-gray-500">
                  123 Library Lane, Booktown, BT 12345
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">LIBRARY STATS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <div className="flex items-center  mb-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="font-semibold">15</span>
                  </div>
                  <p className="text-xs text-gray-600">TOTAL BORROWED</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-semibold">2</span>
                  </div>
                  <p className="text-xs text-gray-600">PENDING REQUESTS</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <CalendarClock className="w-4 h-4 mr-2" />
                    <span className="font-semibold">3</span>
                  </div>
                  <p className="text-xs text-gray-600">BOOKS DUE</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}
