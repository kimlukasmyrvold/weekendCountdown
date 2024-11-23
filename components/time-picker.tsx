"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-picker-input";

interface TimePickerProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="group w-[min(700px,100%-2rem)] flex flex-col items-center gap-4">
            <p className="text-xl opacity-85 group-hover:opacity-100 transition-opacity">Endre når helgen din starter:</p>

            <div className="flex items-start gap-2">
                <div className="grid gap-1 text-center">
                    <TimePickerInput
                        picker="hours"
                        date={date}
                        setDate={setDate}
                        ref={hourRef}
                        onRightFocus={() => minuteRef.current?.focus()}
                    />
                    <Label htmlFor="hours" className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                        Hours
                    </Label>
                </div>
                <div className="grid place-items-center mt-[3px]">
                    <p className="text-3xl opacity-65">:</p>
                </div>
                <div className="grid gap-1 text-center">
                    <TimePickerInput
                        picker="minutes"
                        date={date}
                        setDate={setDate}
                        ref={minuteRef}
                        onLeftFocus={() => hourRef.current?.focus()}
                    />
                    <Label htmlFor="minutes" className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                        Minutes
                    </Label>
                </div>
            </div>
        </div>
    );
}