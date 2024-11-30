import React from 'react';
import { CountdownDisplayProps, CountdownDisplayTimeContainerProps } from '@/lib/interfaces';

export const CountdownDisplay = ({ days, hours, minutes, seconds, milliseconds }: CountdownDisplayProps) => {
    return (
        <div id='countdownDisplay' className="grid grid-cols-2 sm:grid-cols-4 gap-4" role='timer' aria-live='assertive' aria-atomic='true'>
            <CountdownDisplayTimeContainer time={days} format="Days" hidden={days < 1} />
            <CountdownDisplayTimeContainer time={hours} format="Hours" />
            <CountdownDisplayTimeContainer time={minutes} format="Minutes" />
            <CountdownDisplayTimeContainer time={seconds} format="Seconds" />
            <CountdownDisplayTimeContainer time={milliseconds} format="Milliseconds" hidden={days > 0} />
        </div>
    );
}

const CountdownDisplayTimeContainer = ({ time, format, hidden }: CountdownDisplayTimeContainerProps) => {
    const lFormat = format.toLowerCase();

    return (
        <div id={lFormat} className={`${hidden ? 'hidden' : 'flex'} flex-col gap-4 items-center`} aria-labelledby={`${lFormat}Label`}>
            <span id={`${lFormat}Value`} className="text-6xl font-semibold">{time.toString().padStart(2, '0')}</span>
            <span id={`${lFormat}Label`} className="text-2xl opacity-85">{format}</span>
        </div>
    );
}