export const metadata = {
    title: "Russley's Site",
    description: "Russley's personal site",
};

import { SpeedInsights } from "@vercel/speed-insights/next";

import Link from "next/link";
import "../styles/global.css";

export default function RootLayout(props: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap"
                    rel="stylesheet"
                />
            </head>

            <body className="p-4 flex flex-col gap-4">
                <SpeedInsights />
                <div className="flex flex-row items-center gap-4">
                    <h1>Russley</h1>
                    <Link href="/blog">Blog</Link>
                </div>
                <hr />
                {props.children}
            </body>
        </html>
    );
}
