"use client";

import { useEffect, useMemo, useState } from "react";

import { getDaysUntilDay, isWeekend } from "@/lib/actions";
import { TimePicker } from "@/components/time-picker";
import { GetDaysUntilDay } from "@/lib/interfaces";

export default function Countdown() {
    const now: Date = useMemo(() => new Date(), []);
    const [isClient, setIsClient] = useState(false);
    const [weekend, setWeekend] = useState<boolean>(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDate = localStorage.getItem("workHours");

            if (savedDate) {
                setDate(new Date(savedDate));
            } else {
                const defaultDate = new Date(now);
                defaultDate.setHours(16, 0, 0, 0);
                setDate(defaultDate);
            }
        }
    }, [now]);

    useEffect(() => {
        if (typeof window !== "undefined" && date) {
            localStorage.setItem("workHours", date.toString());
        }
    }, [date]);

    const daysUntilFriday: GetDaysUntilDay = date
        ? getDaysUntilDay("Friday", date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), now)
        : { days: now.getDay().toString(), time: { hours: "16", minutes: "0", seconds: "0", milliseconds: "0" } };

    const daysUntilMonday: GetDaysUntilDay = getDaysUntilDay("Monday", 0, 0, 0, 0, now);

    useEffect(() => {
        setIsClient(true);
        const intervalId = setInterval(() => {
            setWeekend(isWeekend(16, 0, new Date()));
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <article className="flex flex-col items-center justify-center mb-24 flex-1 pt-16">
            <div className="flex flex-col justify-center gap-4 items-center mb-20">
                <h1 className="text-4xl md:text-6xl">{weekend ? "It's the weekend! 🎉" : "It's a weekday. 😔"}</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 mb-20 w-full">
                <div className="w-[min(700px,100%-2rem)]">
                    {weekend ? (
                        <CountdownToMonday count={daysUntilMonday}></CountdownToMonday>
                    ) : (
                        <CountdownToFriday count={daysUntilFriday}></CountdownToFriday>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 items-center mb-20 w-full">
                <TimePicker setDate={setDate} date={date}></TimePicker>
            </div>
        </article>
    );
}

function CountdownToFriday({ count }: { count: GetDaysUntilDay }) {
    return (
        <>
            <div className="mb-6">
                <p className="text-xl font-normal text-center sm:text-left">The weekend starts in:</p>
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

function CountdownToMonday({ count }: { count: GetDaysUntilDay }) {
    return (
        <>
            <div className="mb-6">
                <p className="text-xl font-normal text-center sm:text-left">The weekend is over in:</p>
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