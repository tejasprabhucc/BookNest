"use client";
import React, { Children, ReactElement, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { INavOption } from "@/src/lib/definitions";
import Link from "next/link";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import DropDownOptions from "./dropDownMenu";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import SettingsDialog from "./settingsDialog";

const SidenavLinks = ({
  navOptions,
  user,
  children,
}: {
  navOptions: (INavOption & { iconName: string })[];
  user: User;
  children: React.JSX.Element;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  const renderIcon = (iconName: keyof typeof Icons) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.FC;
    return IconComponent ? (
      <div className="h-5 w-5 mr-2">
        <IconComponent />
      </div>
    ) : null;
  };

  const t = useTranslations("Sidenav");

  return (
    <div
      className={cn(
        " flex-col h-screen bg-slate-800 text-white transition-all duration-300 hidden shadow-lg p-2 lg:flex",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-xl font-bold">{t("title")}</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-slate-700"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {navOptions.map((option) => (
            <li key={option.url}>
              <Link href={option.url} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-slate-700",
                    pathname === option.url && "bg-slate-700",
                    isCollapsed ? "px-2" : "px-4"
                  )}
                >
                  {renderIcon(option.iconName as keyof typeof Icons)}
                  {!isCollapsed && <span>{option.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "justify-start hover:bg-slate-700 mb-2 mx-2",
              isCollapsed ? "px-2" : "px-4"
            )}
          >
            <Icons.Settings className="h-6 w-6 mr-2" />
            {!isCollapsed && <span>{t("settings")}</span>}
          </Button>
        </DialogTrigger>
        <SettingsDialog />
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "p-4 border-t border-slate-700 flex items-center ",
              isCollapsed && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || "User"}
              />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        {children}
      </DropdownMenu>
    </div>
  );
};

export default SidenavLinks;
