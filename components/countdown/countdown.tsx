"use client";

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { getTimeRemaining, getNextWeekend, adjustDateIfHeadOfEnd } from '@/lib/actions';
import { CountdownDisplay } from '@/components/countdown/countdown_display';
import { SelectDay } from '@/components/select-days';
import { TimePicker } from "@/components/countdown/countdown_timePicker";

export function WeekendCountdown() {
    const [endDay, setEndDay] = useLocalStorage('weekendEndDay', 1);
    const [endTime, setEndTime] = useLocalStorage('weekendEndTime', '00:00');
    const [startDay, setStartDay] = useLocalStorage('weekendStartDay', 5);
    const [startTime, setStartTime] = useLocalStorage('weekendStartTime', '16:00');
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(new Date()));
    const [isWeekend, setIsWeekend] = useState<boolean>(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const [startHour, startMinute] = startTime!.split(':').map(Number);
            const [endHour, endMinute] = endTime!.split(':').map(Number);
            const weekendEnd = getNextWeekend(endDay!, endHour, endMinute);
            const weekendStart = adjustDateIfHeadOfEnd(getNextWeekend(startDay!, startHour, startMinute), weekendEnd);
            const now = new Date();

            const status = now >= weekendStart && now < weekendEnd;
            setIsWeekend(status);

            setTimeRemaining(getTimeRemaining(status ? weekendEnd : weekendStart));
        }, 500);

        return () => clearInterval(timer);
    }, [startDay, startTime, endDay, endTime]);

    return (
        <article className='flex flex-col justify-center items-center flex-1 mb-24 pt-16'>
            <div className="flex flex-col justify-center items-center gap-4 mb-20">
                <h2 className="text-4xl md:text-6xl">{isWeekend ? "It's the weekend! 🎉" : "It's a weekday. 😔"}</h2>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 mb-20 w-full">
                <div className='w-[min(700px,100%-2rem)]'>
                    <p className='text-xl font-normal text-center sm:text-left mb-6'>{isWeekend ? "The weekend is over in:" : "The weekend starts in:"}</p>
                    <CountdownDisplay {...timeRemaining} />
                </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-4 mb-20 w-full'>
                <div className='flex gap-8'>
                    <div className='flex items-start gap-2'>
                        <SelectDay
                            value={String(startDay)}
                            onValueChange={(value) => setStartDay(Number(value))}
                        />
                        <div className="grid place-items-center mt-[30px]">
                            <span className="text-3xl opacity-65">:</span>
                        </div>
                        <TimePicker onTimeChange={setStartTime} time={startTime} />
                    </div>
                    <div className='flex items-start gap-2'>
                        <SelectDay
                            value={String(endDay)}
                            onValueChange={(value) => setEndDay(Number(value))}
                        />
                        <div className="grid place-items-center mt-[30px]">
                            <span className="text-3xl opacity-65">:</span>
                        </div>
                        <TimePicker onTimeChange={setEndTime} time={endTime} />
                    </div>
                </div>
            </div>
        </article>
    );
}