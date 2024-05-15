import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: () => (
        <div className="p-8">
            <p>Hi! I'm Russley Shaw.</p>
            <p>
                I'm a senior full-stack developer with deep experience in TypeScript, React and
                microservice architecture.
            </p>
        </div>
    ),
});
