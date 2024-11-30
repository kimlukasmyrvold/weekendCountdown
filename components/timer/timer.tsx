// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { format } from "date-fns";

// import { GetDaysUntilDay } from "@/lib/interfaces";
// import { getDaysUntilDay, isWeekend } from "@/lib/actions";

// import { TimePicker } from "@/components/timer/timePicker";
// import { DatePicker } from "@/components/timer/datePicker";
// import { CountdownToDay } from "@/components/countdown/countDownToDay";

// // import { Label } from "@/components/ui/label";
// // import { TimePickerInput } from "@/components/ui/timePickerInput";


// export default function Timer() {
//     const [selectedDate, setSelectedDate] = useState<Date | undefined>();
//     const formatedDate: string = selectedDate ? format(selectedDate, "PPP") : "None";

//     const now: Date = useMemo(() => new Date(), []);
//     const emptyDate: Date = useMemo(() => new Date(now), [now]);
//     emptyDate.setHours(0, 0, 0, 0);
//     const defaults: { hour: number, minute: number, second: number, millisecond: number } = useMemo(() => {
//         return {
//             hour: 16,
//             minute: 0,
//             second: 0,
//             millisecond: 0,
//         };
//     }, []);

//     const [isClient, setIsClient] = useState(false);
//     const [weekend, setWeekend] = useState<boolean>(false);
//     const [date, setDate] = useState<Date | undefined>(() => {
//         const defaultDate: Date = new Date(now);
//         defaultDate.setHours(defaults.hour, defaults.minute, defaults.second, defaults.millisecond);
//         return defaultDate;
//     });

//     const [fridayCount, setFridayCount] = useState<GetDaysUntilDay>(getDaysUntilDay("Friday", date!, now));
//     const [mondayCount, setMondayCount] = useState<GetDaysUntilDay>(getDaysUntilDay("Monday", emptyDate, now));

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const savedDate = localStorage.getItem("workHours");

//             if (savedDate) {
//                 setDate(new Date(savedDate));
//             } else {
//                 const newDate = new Date(now);
//                 newDate.setHours(defaults.hour, defaults.minute, defaults.second, defaults.millisecond);
//                 setDate(newDate);
//             }
//         }
//     }, [now, defaults]);

//     useEffect(() => {
//         if (typeof window !== "undefined" && date) {
//             localStorage.setItem("workHours", date.toString());
//         }
//     }, [date]);

//     useEffect(() => {
//         setIsClient(true);
//         const intervalId = setInterval(() => {
//             const newDate: Date = new Date();
//             setWeekend(isWeekend(defaults.hour, defaults.minute, newDate));
//             setFridayCount(getDaysUntilDay("Friday", date!, newDate));
//             setMondayCount(getDaysUntilDay("Monday", emptyDate, newDate));
//         }, 500);

//         return () => clearInterval(intervalId);
//     }, [defaults, date, emptyDate]);

//     if (!isClient) {
//         return null;
//     }

//     return (
//         <article className="flex flex-col items-center justify-center mb-24 flex-1 pt-16">
//             <div className="flex flex-col justify-center gap-4 items-center mb-20 mx-1">
//                 <h2 className="text-xl md:text-3xl"><span className="opacity-85">Counting down to:</span> <span className="text-3xl md:text-5xl">{formatedDate}</span></h2>
//             </div>
//             <div className="flex flex-col justify-center items-center gap-4 mb-20 w-full">
//                 <div className="w-[min(700px,100%-2rem)]">
//                     {weekend ? (
//                         <CountdownToDay count={mondayCount} title="The weekend is over in:"></CountdownToDay>
//                     ) : (
//                         <CountdownToDay count={fridayCount}></CountdownToDay>
//                     )}
//                 </div>
//             </div>

//             <div className="flex flex-col justify-center gap-4 items-center mb-20 w-full">
//                 <DatePicker date={selectedDate} onDateChange={setSelectedDate} ></DatePicker>
//                 <TimePicker onTimeChange={setDate} time={date}></TimePicker>
//             </div>
//         </article>
//     );
// }


// // interface TimePickerProps {
// //     date: Date | undefined;
// //     onDateChange: (date: Date | undefined) => void;
// // }

// // export function TimePicker({ date, onDateChange }: TimePickerProps) {
// //     const minuteRef = useRef<HTMLInputElement>(null);
// //     const hourRef = useRef<HTMLInputElement>(null);

// //     return (
// //         <div className="group w-[min(700px,100%-2rem)] flex flex-col items-center gap-4">
// //             <p className="text-xl opacity-85 group-hover:opacity-100 transition-opacity">Change when your weekend starts:</p>

// //             <div className="flex items-start gap-2">
// //                 <div className="grid gap-1 text-center">
// //                     <TimePickerInput
// //                         picker="hours"
// //                         date={date}
// //                         onDateChange={onDateChange}
// //                         ref={hourRef}
// //                         onRightFocus={() => minuteRef.current?.focus()}
// //                     />
// //                     <Label htmlFor="hours" className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
// //                         Hours
// //                     </Label>
// //                 </div>
// //                 <div className="grid place-items-center mt-[3px]">
// //                     <p className="text-3xl opacity-65">:</p>
// //                 </div>
// //                 <div className="grid gap-1 text-center">
// //                     <TimePickerInput
// //                         picker="minutes"
// //                         date={date}
// //                         onDateChange={onDateChange}
// //                         ref={minuteRef}
// //                         onLeftFocus={() => hourRef.current?.focus()}
// //                     />
// //                     <Label htmlFor="minutes" className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
// //                         Minutes
// //                     </Label>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }