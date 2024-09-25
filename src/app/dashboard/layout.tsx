import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidenav from "@/src/components/navbar/sidenav";
import { IMember, INavOption } from "@/src/lib/definitions";
import {
  ArrowLeftRight,
  Book,
  BookCheck,
  BookPlus,
  CalendarCheck,
  PersonStanding,
} from "lucide-react";
import { getUserSession } from "@/src/lib/actions";
import { Toaster } from "@/src/components/ui/toaster";
import { redirect } from "next/navigation";
import { User } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navOptions: INavOption[] = [
    { label: "Books", url: "/dashboard", icon: Book },
    { label: "My Books", url: "/dashboard/myBooks", icon: BookCheck },
    { label: "My Requests", url: "/dashboard/myRequests", icon: BookPlus },
    { label: "Professors", url: "/dashboard/professors", icon: PersonStanding },
    {
      label: "My Appointments",
      url: "/dashboard/myAppointments",
      icon: CalendarCheck,
    },
  ];
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col lg:min-h-screen lg:flex-row">
      <Sidenav user={user} navOptions={navOptions} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
