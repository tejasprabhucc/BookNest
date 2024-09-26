"use client"
import React from "react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import LocaleSwitcher from "@/src/components/localeSwitcher";
import { ModeToggle } from "@/src/components/ui/theme-change";
import { Moon, Sun } from "lucide-react";

const SettingsDialog = () => {
  const { theme } = useTheme();
  const t = useTranslations("Sidenav");
  const currentLocale = useLocale();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{t("settings")}</DialogTitle>
      </DialogHeader>
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="theme" className="text-lg">
              {t("theme")}
            </Label>
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-slate-400" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="language" className="text-lg">
              {t("language")}
            </Label>
            <span className="text-sm text-muted-foreground">
              {currentLocale === "en"
                ? "English"
                : currentLocale === "kn"
                ? "ಕನ್ನಡ"
                : currentLocale}
            </span>
          </div>
          <LocaleSwitcher />
        </div>
      </div>
    </DialogContent>
  );
};

export default SettingsDialog;
