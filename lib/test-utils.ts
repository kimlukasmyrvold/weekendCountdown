import { differenceInSeconds, addDays, setHours, setMinutes, setSeconds } from 'date-fns';

export function getTimeRemaining(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
    const totalSeconds = Math.max(0, differenceInSeconds(targetDate, new Date()));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { days, hours, minutes, seconds };
}

export function getNextWeekend(day: number, hour: number, minute: number): Date {
    const now = new Date();
    let weekend = setHours(setMinutes(setSeconds(now, 0), minute), hour);
    while (weekend.getDay() !== day || weekend <= now) {
        weekend = addDays(weekend, 1);
    }
    return weekend;
}
