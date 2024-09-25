"use client";

import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { IBook, IMember, SortOptions } from "@/src/lib/definitions";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/src/components/ui/select";
import { ITransactionDetails } from "@/src/repositories/transaction.repository";
import { getUserLocale } from "@/src/services/locale";
import { useTranslations } from "next-intl";

interface SortOptionProps {
  sortOptions:
    | SortOptions<IBook>
    | SortOptions<IMember>
    | SortOptions<ITransactionDetails>;
}

const SortControl = ({ sortOptions }: SortOptionProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", value);
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const toggleSortOrder = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(
      "order",
      sortOptions.sortOrder === "asc" ? "desc" : "asc"
    );
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const t = useTranslations("Books");
  return (
    <div className="flex items-center gap-2">
      <Select value={sortOptions.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem defaultChecked={true} value="title">
            {t("sortOptions.title")}
          </SelectItem>
          <SelectItem value="author"> {t("sortOptions.author")}</SelectItem>
          <SelectItem value="publisher">
            {" "}
            {t("sortOptions.publisher")}
          </SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={toggleSortOrder}>
        <ArrowUpDown
          className={`h-4 w-4 ${
            sortOptions.sortOrder === "desc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
};

export default SortControl;
