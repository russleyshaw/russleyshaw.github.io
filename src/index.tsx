import { createRoot } from "react-dom/client";

import { observer } from "mobx-react";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./router";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "./styles/index.ts";

const router = createBrowserRouter(routes);

export const Root = observer(() => {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
});

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(<Root />);
