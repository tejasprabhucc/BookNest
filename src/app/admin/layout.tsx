import type { Metadata } from "next";
import { Toaster } from "@/src/components/ui/toaster";
import { INavOption } from "@/src/lib/definitions";
import { getUserSession } from "@/src/lib/actions";
import { redirect } from "next/navigation";
import Sidenav from "@/src/components/navbar/sidenav";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "BookNest - Admin",
  description: "Admin panel for managing the library",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("Sidenav");
  const navOptions: INavOption[] = [
    { label: `${t("books")}`, url: "/admin/books", iconName: "Book" },
    {
      label: `${t("requests")}`,
      url: "/admin/requests/",
      iconName: "BookPlus",
    },
    { label: `${t("members")}`, url: "/admin/members", iconName: "Users" },
    {
      label: `${t("transactions")}`,
      url: "/admin/transactions",
      iconName: "ArrowLeftRight",
    },
    { label: `${t("booksDue")}`, url: "/admin/booksDue", iconName: "Clock" },
    {
      label: `${t("professors")}`,
      url: "/admin/professors",
      iconName: "PersonStanding",
    },
    { label: `${t("events")}`, url: "/admin/events", iconName: "Calendar" },
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
