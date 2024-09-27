import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/utils";
import { Button } from "@/components/common/ui/button";
import { Calendar } from "@/components/common/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/ui/popover";
import { SetStateAction } from "react";

export function DatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (val: SetStateAction<Date | undefined>) => void;
}) {
  const [innerDate, setInnerDate] = React.useState<Date | undefined>(date);
  const [show, setShow] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const handleDateChange = React.useCallback(
    (val: Date | undefined) => {
      setInnerDate(val);
      setDate(val);
      setShow(false);
    },
    [setDate]
  );

  useEffect(() => {
    setInnerDate(date);
  }, [date]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !(popoverRef.current as any).contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Popover open={show}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal border-defaultSlate-300",
            !innerDate && "text-muted-foreground",
            "text-black"
          )}
          onClick={() => setShow((prev) => !prev)}
        >
          {innerDate ? (
            format(innerDate, "dd-MM-yyyy")
          ) : (
            <span className="text-gray-400 text-sm font-light font-['Lexend'] leading-normal">
              Pick a date
            </span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4 fill-white stroke-slate-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        style={{
          position: "absolute",
          top: "50%",
          left: " 50%",
          transform: "translate(-50%, -50%)",
        }}
        ref={popoverRef}
      >
        <Calendar
          mode="single"
          selected={innerDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
