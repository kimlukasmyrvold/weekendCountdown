"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/timePickerInput";


export function TimePicker({ time, onTimeChange }: { time: Date | undefined; onTimeChange: (time: Date | undefined) => void }) {
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);

    return (
        <div className="group w-[min(700px,100%-2rem)] flex flex-col items-center gap-4">
            <div className="flex items-start gap-2">
                <div className="grid gap-1 text-center">
                    <TimePickerInput
                        picker="hours"
                        date={time}
                        onDateChange={onTimeChange}
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
                        date={time}
                        onDateChange={onTimeChange}
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