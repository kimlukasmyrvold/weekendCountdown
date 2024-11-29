"use client"

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { CountdownDisplay } from '@/components/CountdownDisplay';
import { getTimeRemaining, getNextWeekend } from '@/lib/test-utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function WeekendCountdown() {
    const [startDay, setStartDay] = useLocalStorage('weekendStartDay', 5); // Friday
    const [startTime, setStartTime] = useLocalStorage('weekendStartTime', '16:00');
    const [endDay, setEndDay] = useLocalStorage('weekendEndDay', 1); // Monday
    const [endTime, setEndTime] = useLocalStorage('weekendEndTime', '00:00');
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
            const [startHour, startMinute] = startTime!.split(':').map(Number);
            const [endHour, endMinute] = endTime!.split(':').map(Number);
            const weekendStart = getNextWeekend(startDay!, startHour, startMinute);
            const weekendEnd = getNextWeekend(endDay!, endHour, endMinute);
            const now = new Date();

            if (now >= weekendStart && now < weekendEnd) {
                setTimeRemaining(getTimeRemaining(weekendEnd));
            } else {
                setTimeRemaining(getTimeRemaining(weekendStart));
            }
        }, 500);

        return () => clearInterval(timer);
    }, [startDay, startTime, endDay, endTime]);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Weekend Countdown</h2>
            <CountdownDisplay {...timeRemaining} />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="weekendStart">Weekend Start</Label>
                    <div className="flex space-x-2">
                        <Input
                            type="number"
                            id="weekendStartDay"
                            value={startDay}
                            onChange={(e) => setStartDay(Number(e.target.value))}
                            min={0}
                            max={6}
                            className="w-16"
                        />
                        <Input
                            type="time"
                            id="weekendStartTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="weekendEnd">Weekend End</Label>
                    <div className="flex space-x-2">
                        <Input
                            type="number"
                            id="weekendEndDay"
                            value={endDay}
                            onChange={(e) => setEndDay(Number(e.target.value))}
                            min={0}
                            max={6}
                            className="w-16"
                        />
                        <Input
                            type="time"
                            id="weekendEndTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

