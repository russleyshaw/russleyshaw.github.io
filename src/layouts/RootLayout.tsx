import { observer } from "mobx-react";
import { Navbar } from "../partials/Navbar";

import styles from "./RootLayout.module.css";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";

import { ReactQueryDevtools as QueryDevTools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools as RouterDevTools } from "@tanstack/router-devtools";

export const RootLayout = observer(() => {
    return (
        <div className={styles.root}>
            <ScrollRestoration />
            <Navbar />
            <Outlet />

            {import.meta.env.DEV && (
                <>
                    <QueryDevTools />
                    <RouterDevTools />
                </>
            )}
        </div>
    );
});
