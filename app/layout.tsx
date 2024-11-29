import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
    title: "Weekend Countdown",
    description: "Countdown the time until the weekend.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#04040c" />
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Counter" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className="bg-background text-foreground">
                <div id="app" className="md:mb-48">
                    <main className="flex flex-col min-h-screen bg-background relative z-10 py-4">
                        <header className="flex justify-between items-center pb-2 mx-auto w-[min(1200px,100%-2rem)]">
                            <div>
                                <Link href={'/'} className="text-4xl mb-1">Weekend Countdown</Link>
                                <p>Countdown the time until the weekend</p>
                            </div>
                        </header>
                        {children}
                    </main>
                    <footer className="md:fixed bottom-0 z-0 w-full min-h-48 bg-card flex flex-col justify-center items-center gap-2 py-6 px-3">
                        <p className="opacity-85">
                            Copyright &copy; {new Date().getFullYear()}
                            <span className="opacity-50 mx-2">|</span>
                            <Link className="hover:underline transition-all duration-300" href={"https://github.com/kimlukasmyrvold/weekendCountdown"} target="blank">Check out the source code on GitHub</Link>
                        </p>
                        <p className="opacity-85">
                            This website is developed and maintained by <Link className="underline" href="https://github.com/kimlukasmyrvold" target="_blank">Kim Lukas Myrvold</Link>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
