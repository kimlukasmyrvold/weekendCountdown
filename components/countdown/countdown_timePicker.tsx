"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/timePickerInput";


export function TimePicker({ time, onTimeChange }: { time: string | undefined; onTimeChange: (time: string | undefined) => void }) {
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-start gap-2">
            <div className="grid gap-1 text-center">
                <Label className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                    <span>Hours</span>
                    <TimePickerInput
                        picker="hours"
                        date={new Date(new Date().setHours(parseInt(time!.split(':')[0]), parseInt(time!.split(':')[1])))}
                        onDateChange={(value) => onTimeChange(`${value?.getHours()}:${value?.getMinutes()}`)}
                        ref={hourRef}
                        onRightFocus={() => minuteRef.current?.focus()}
                    />
                </Label>
            </div>
            <div className="grid place-items-center mt-[30px]">
                <span className="text-3xl opacity-65">:</span>
            </div>
            <div className="grid gap-1 text-center">
                <Label className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                    <span>Minutes</span>
                    <TimePickerInput
                        picker="minutes"
                        date={new Date(new Date().setHours(parseInt(time!.split(':')[0]), parseInt(time!.split(':')[1])))}
                        onDateChange={(value) => onTimeChange(`${value?.getHours()}:${value?.getMinutes()}`)}
                        ref={minuteRef}
                        onLeftFocus={() => hourRef.current?.focus()}
                    />
                </Label>
            </div>
        </div>
    );
}