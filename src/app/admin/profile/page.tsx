import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  getUserByEmail,
  getUserSession,
  getUserTransactionSummary,
} from "@/src/lib/actions";
import { IMember } from "@/src/lib/definitions";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";
import LibraryStats from "@/src/components/profile/library-stats";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import Link from "next/link";
import SignOutButton from "@/src/components/navbar/signOutButton";
import UserActivity from "@/src/components/profile/user-activity";
import ContactInfo from "@/src/components/profile/contact-info";
import ProfileCard from "@/src/components/profile/profile-card";

export default async function Profile() {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const userEmail = session.email;

  const userData = (await getUserByEmail(userEmail)) as IMember;
  const userTransactionSummary = await getUserTransactionSummary(userData.id);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
            <div className="flex space-x-2">
              <Link href={`/admin/profile/${userData.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
              <div className="hidden lg:flex">
                <SignOutButton />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ProfileCard userData={userData} />
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <ContactInfo userData={userData} />

              <LibraryStats userTransactionSummary={userTransactionSummary} />
            </TabsContent>
            <TabsContent value="activity">
              <UserActivity />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
