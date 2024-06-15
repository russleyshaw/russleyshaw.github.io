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
