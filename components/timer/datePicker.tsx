"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ date, onDateChange }: { date: Date | undefined; onDateChange: (date: Date | undefined) => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-between text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}