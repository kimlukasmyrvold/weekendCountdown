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




export interface CountdownDisplayProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export interface CountdownDisplayTimeContainerProps {
    time: number;
    format: string;
    hidden?: boolean;
}

export interface GetTimeRemainingProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
