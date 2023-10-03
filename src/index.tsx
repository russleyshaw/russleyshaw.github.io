import { createRoot } from "react-dom/client";

import { observer } from "mobx-react";
import { StrictMode, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { createRouter } from "./router";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export const Root = observer(() => {
    const [router] = useState(() => createRouter());

    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
});

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(<Root />);
