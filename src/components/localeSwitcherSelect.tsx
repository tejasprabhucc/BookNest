"use client";

import { CheckIcon, LanguageIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useTransition } from "react";
import { Locale } from "@/src/i18n/config";
import { setUserLocale } from "@/src/services/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          className={`w-[180px] rounded-sm p-2 transition-colors hover:bg-slate-200 ${
            isPending ? "pointer-events-none opacity-60" : ""
          }`}
          aria-label={label}
        >
          <div className="flex items-center">
            <Globe className="mr-2 h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
            <SelectValue placeholder="Select language" />
          </div>
        </SelectTrigger>
        <SelectContent align="end" className="min-w-[8rem]">
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="flex items-center px-3 py-2 text-base"
            >
              <p className="text-slate-900">{item.label}</p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
