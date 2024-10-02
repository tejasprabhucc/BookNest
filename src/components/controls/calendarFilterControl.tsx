"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/src/components/ui/calendar";
import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

const CalendarFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: searchParams.get("start")
      ? new Date(searchParams.get("start") as string)
      : undefined,
    to: searchParams.get("end")
      ? new Date(searchParams.get("end") as string)
      : undefined,
  });

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("start", selectedDate.from.toISOString().split("T")[0]);
      if (selectedDate.to) {
        params.set("end", selectedDate.to.toISOString().split("T")[0]);
      } else {
        params.delete("end");
      }
      router.push(`?${params.toString()}`);
    } else {
      router.push("");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarFilter;
