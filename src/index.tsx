import { createRoot } from "react-dom/client";

import { observer } from "mobx-react";
import { StrictMode } from "react";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import "./styles/index.css";
import "./lib/highlight";

const queryClient = new QueryClient();

export const Root = observer(() => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(<Root />);
