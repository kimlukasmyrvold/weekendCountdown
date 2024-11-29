import { GetDaysUntilDay } from "@/lib/interfaces";

export function CountdownToDay({ count, title }: { count: GetDaysUntilDay, title?: string }) {
    return (
        <>
            {title && (
                <div className="mb-6">
                    <p className="text-xl font-normal text-center sm:text-left">{title}</p>
                </div>
            )}
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