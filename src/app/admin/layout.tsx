import type { Metadata } from "next";
import Sidenav from "@/src/components/dashboard/sidenav";
import { Toaster } from "@/src/components/ui/toaster";
import { INavOption } from "@/src/lib/definitions";
import {
  Book,
  BookPlus,
  ArrowLeftRight,
  Users,
  HeartIcon,
  HomeIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "BookNest - Admin",
  description: "Admin panel for managing the library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navOptions: INavOption[] = [
    { label: "Books", url: "/admin/books", icon: Book },
    { label: "Requests", url: "/admin/requests", icon: BookPlus },
    { label: "Members", url: "/admin/members", icon: Users },
    { label: "Transactions", url: "/admin/transactions", icon: ArrowLeftRight },
  ];

  return (
    <div className="flex flex-1 flex-col h-screen lg:flex-row">
      <Sidenav navOptions={navOptions} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
