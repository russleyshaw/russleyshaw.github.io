import { observer } from "mobx-react";
import { Navbar } from "../partials/Navbar";

import { Outlet, ScrollRestoration } from "@tanstack/react-router";

import { ReactQueryDevtools as QueryDevTools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools as RouterDevTools } from "@tanstack/router-devtools";

export const RootLayout = observer(() => {
    return (
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4">
            <ScrollRestoration />
            <Navbar />

            <div className="">
                <Outlet />
            </div>

            {import.meta.env.DEV && (
                <>
                    <QueryDevTools />
                    <RouterDevTools />
                </>
            )}
        </div>
    );
});
