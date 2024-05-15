import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-4 flex flex-row items-baseline gap-2">
                <h1>Russley</h1>
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link to="/blog/" className="[&.active]:font-bold">
                    Blog
                </Link>
                <Link to="/projects" className="[&.active]:font-bold">
                    Projects
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
