export interface GetTime {
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
}

export interface GetDate {
    year: string;
    month: string;
    day: string;
}

export interface GetDaysUntilDay {
    days: string;
    time: GetTime;
}