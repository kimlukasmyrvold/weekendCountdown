import { GetTimeRemainingProps } from '@/lib/interfaces';
import { isBefore, differenceInMilliseconds, addDays, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

export const getTimeRemaining = (targetDate: Date): GetTimeRemainingProps => {
    const diff: number = Math.max(0, differenceInMilliseconds(targetDate, new Date()));

    const days: number = Math.floor(diff / (1000 * 3600 * 24));
    const hours: number = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes: number = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds: number = diff % 1000;

    return { days, hours, minutes, seconds, milliseconds };
}

export const getNextWeekend = (day: number, hour: number, minute: number): Date => {
    const now = new Date();
    let weekend = setHours(setMinutes(setSeconds(setMilliseconds(now, 0), 0), minute), hour);
    while (weekend.getDay() !== day || weekend <= now) {
        weekend = addDays(weekend, 1);
    }
    return weekend;
}

export const adjustDateIfHeadOfEnd = (firstDate: Date, lastDate: Date) => {
    if (isBefore(firstDate, lastDate)) return firstDate;
    return addDays(firstDate, -7);
};