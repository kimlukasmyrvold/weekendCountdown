import { WeekendCountdown } from '@/components/test-countdown';

export default function Test() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-12">
        <h1 className="text-4xl font-bold text-center mb-8">Countdown Timers</h1>
        <WeekendCountdown />
      </div>
    </main>
  );
}

