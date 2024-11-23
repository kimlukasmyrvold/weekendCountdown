"use client";

import { useEffect, useMemo, useState } from "react";

import { getDaysUntilDay, isWeekend } from "@/lib/actions";
import { TimePicker } from "@/components/time-picker";
import { GetDaysUntilDay } from "@/lib/interfaces";

export default function WeekendCountdown() {
    const now: Date = useMemo(() => new Date(), []);
    const emptyDate: Date = useMemo(() => new Date(now), [now]);
    emptyDate.setHours(0, 0, 0, 0);
    const defaults: { hour: number, minute: number, second: number, millisecond: number } = useMemo(() => {
        return {
            hour: 16,
            minute: 0,
            second: 0,
            millisecond: 0,
        };
    }, []);

    const [isClient, setIsClient] = useState(false);
    const [weekend, setWeekend] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(() => {
        const defaultDate: Date = new Date(now);
        defaultDate.setHours(defaults.hour, defaults.minute, defaults.second, defaults.millisecond);
        return defaultDate;
    });

    const [fridayCount, setFridayCount] = useState<GetDaysUntilDay>(getDaysUntilDay("Friday", date, now));
    const [mondayCount, setMondayCount] = useState<GetDaysUntilDay>(getDaysUntilDay("Monday", emptyDate, now));

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDate = localStorage.getItem("workHours");

            if (savedDate) {
                setDate(new Date(savedDate));
            } else {
                const newDate = new Date(now);
                newDate.setHours(defaults.hour, defaults.minute, defaults.second, defaults.millisecond);
                setDate(newDate);
            }
        }
    }, [now, defaults]);

    useEffect(() => {
        if (typeof window !== "undefined" && date) {
            localStorage.setItem("workHours", date.toString());
        }
    }, [date]);

    useEffect(() => {
        setIsClient(true);
        const intervalId = setInterval(() => {
            const newDate: Date = new Date();
            setWeekend(isWeekend(defaults.hour, defaults.minute, newDate));
            setFridayCount(getDaysUntilDay("Friday", date, newDate));
            setMondayCount(getDaysUntilDay("Monday", emptyDate, newDate));
        }, 500);

        return () => clearInterval(intervalId);
    }, [defaults, date, emptyDate]);

    if (!isClient) {
        return null;
    }

    return (
        <article className="flex flex-col items-center justify-center mb-24 flex-1 pt-16">
            <div className="flex flex-col justify-center gap-4 items-center mb-20">
                <h2 className="text-4xl md:text-6xl">{weekend ? "It's the weekend! 🎉" : "It's a weekday. 😔"}</h2>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 mb-20 w-full">
                <div className="w-[min(700px,100%-2rem)]">
                    {weekend ? (
                        <CountdownToDay count={mondayCount} title="The weekend is over in:"></CountdownToDay>
                    ) : (
                        <CountdownToDay count={fridayCount} title="The weekend starts in:"></CountdownToDay>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 items-center mb-20 w-full">
                <TimePicker setDate={setDate} date={date}></TimePicker>
            </div>
        </article>
    );
}

function CountdownToDay({ count, title }: { count: GetDaysUntilDay, title: string }) {
    return (
        <>
            <div className="mb-6">
                <p className="text-xl font-normal text-center sm:text-left">{title}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <TimeContainer time={count.days} format="Days" hidden={Number(count.days) < 1}></TimeContainer>
                <TimeContainer time={count.time.hours} format="Hours"></TimeContainer>
                <TimeContainer time={count.time.minutes} format="Minutes"></TimeContainer>
                <TimeContainer time={count.time.seconds} format="Seconds"></TimeContainer>
                <TimeContainer time={count.time.milliseconds} format="Milliseconds" hidden={Number(count.days) > 0}></TimeContainer>
            </div>
        </>
    );
}

function TimeContainer({ time, format, hidden }: { time: string, format: string, hidden?: boolean }) {
    return (
        <div className={`${hidden ? 'hidden' : 'flex'} flex-col gap-4 items-center`}>
            <p className="text-6xl font-semibold">{time}</p>
            <p className="text-2xl opacity-85">{format}</p>
        </div>
    );
}