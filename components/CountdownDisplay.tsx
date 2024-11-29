import React from 'react';

interface CountdownDisplayProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownDisplay({ days, hours, minutes, seconds }: CountdownDisplayProps) {
    return (
        <div className="text-4xl font-bold text-center">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-1">{days}d</span>
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-1">{hours}h</span>
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-1">{minutes}m</span>
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded">{seconds}s</span>
        </div>
    );
}

