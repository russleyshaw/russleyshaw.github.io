import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/blog/")({
    component: () => <div className="p-8">Coming (again) soon...</div>,
});
