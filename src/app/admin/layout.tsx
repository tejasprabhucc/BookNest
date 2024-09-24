import type { Metadata } from "next";
import Sidenav from "@/src/components/navbar/sidenav";
import { Toaster } from "@/src/components/ui/toaster";
import { INavOption } from "@/src/lib/definitions";
import { Book, BookPlus, ArrowLeftRight, Users, Clock } from "lucide-react";
import { getUserSession } from "@/src/lib/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "BookNest - Admin",
  description: "Admin panel for managing the library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navOptions: INavOption[] = [
    { label: "Books", url: "/admin/books", icon: Book },
    { label: "Requests", url: "/admin/requests/", icon: BookPlus },
    { label: "Members", url: "/admin/members", icon: Users },
    { label: "Transactions", url: "/admin/transactions", icon: ArrowLeftRight },
    { label: "Books Due", url: "/admin/booksDue", icon: Clock },
  ];

  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col h-screen lg:flex-row">
      <Sidenav user={user} navOptions={navOptions} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
