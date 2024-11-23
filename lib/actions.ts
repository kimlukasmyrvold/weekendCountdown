import { GetTime, GetDate, GetDaysUntilDay } from "@/lib/interfaces";
import { daysOfWeek } from "@/lib/global";

export const getTime = (now: Date) => {
    return {
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
        milliseconds: now.getMilliseconds().toString().padStart(2, '0'),
    } as GetTime;
};

export const getDate = (now: Date) => {
    return {
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString().padStart(2, '0'),
        day: now.getDate().toString().padStart(2, '0'),
    } as GetDate;
};

export const getDay = (now: Date) => {
    return daysOfWeek[now.getDay()] as string;
};

const isTargetTimePassed = (
    now: Date,
    targetHour: number,
    targetMinute: number,
    targetSecond: number,
    targetMillisecond: number
): boolean => {
    return (
        now.getHours() > targetHour ||
        (now.getHours() === targetHour && now.getMinutes() > targetMinute) ||
        (now.getHours() === targetHour && now.getMinutes() === targetMinute && now.getSeconds() > targetSecond) ||
        (now.getHours() === targetHour && now.getMinutes() === targetMinute && now.getSeconds() === targetSecond && now.getMilliseconds() >= targetMillisecond)
    );
};

export const getDaysUntilDay = (
    targetDay: string,
    time: Date,
    now: Date
) => {
    const targetDayIndex = daysOfWeek.indexOf(targetDay);
    if (targetDayIndex === -1) throw new Error("Invalid day of the week.");
    const currentDayIndex = now.getDay();

    const [targetHour, targetMinute, targetSecond, targetMillisecond] = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()];
    let daysUntil = targetDayIndex - currentDayIndex;
    if (daysUntil < 0 || (daysUntil === 0 && isTargetTimePassed(now, targetHour, targetMinute, targetSecond, targetMillisecond))) {
        daysUntil += 7;
    }

    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + daysUntil);
    targetDate.setHours(targetHour, targetMinute, targetSecond, targetMillisecond);

    const diff = targetDate.getTime() - now.getTime();

    const milliseconds = (diff % 1000).toString().padStart(2, '0');
    const totalSeconds = Math.floor(diff / 1000);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = (totalHours % 24).toString().padStart(2, '0');
    const days = (Math.floor(totalHours / 24)).toString();

    return {
        days,
        time: {
            hours,
            minutes,
            seconds,
            milliseconds,
        },
    } as GetDaysUntilDay;
};


export const isWeekend = (hour: number, minute: number, now: Date): boolean => {
    const day: number = now.getDay();

    if (day === 0 || day === 6) return true as boolean;

    if (day === 5) {
        const endOfWork: Date = new Date(now);
        endOfWork.setHours(hour, minute, 0, 0);

        if (now >= endOfWork) return true as boolean;
    }

    return false as boolean;
}